"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import {
  BASE_HEIGHT,
  DESKTOP_SCATTER,
  LOOKS,
  MOBILE_LOOKS,
  MOBILE_SCATTER,
  RING,
  garment,
  type Float,
  type Look,
} from "./heroLayout";
import {
  floorFragment,
  garmentFragment,
  garmentVertex,
  satinFragment,
  satinVertex,
  shadowFragment,
  shadowVertex,
} from "./shaders";

type Props = {
  /** 0..1 scroll progress through the hero (written by ScrollTrigger, read every frame). */
  progress: RefObject<number>;
  mobile: boolean;
  /** Render only while the hero is on screen. */
  active: boolean;
  onReady: () => void;
  /** Called when a different outfit turns to the front of the carousel. */
  onLook?: (index: number, look: Look) => void;
};

const FOV = 35;
const CAM_Z = 10;
const ASPECT = 315 / 399; // garment cut-out images

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeInCubic = (t: number) => t * t * t;
/** Scroll position -> carousel steps with soft detents: each look settles at the front. */
const detent = (x: number) => x - (Math.sin(2 * Math.PI * x) / (2 * Math.PI)) * 0.9;
const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const DEG = Math.PI / 180;

// Scroll timeline (fractions of the hero's scroll).
const T = {
  flyStart: 0.07, // garments leave their floating spots
  flySpan: 0.26, // each piece's flight
  ringDone: 0.46, // every look is on the ring
  rotEnd: 0.86, // last detent; then the lights dim into the next section
  spinIn: -1.25, // the ring turns in while it fills
};

type Slot = Float & {
  id: string;
  role: "top" | "bottom";
  look: number; // index in the displayed looks
  sx: number; sy: number; sz: number; w: number; h: number; phase: number;
};

function useSlots(mobile: boolean) {
  const size = useThree((s) => s.size);
  return useMemo(() => {
    const vh = 2 * Math.tan((FOV / 2) * DEG) * CAM_Z;
    const vw = vh * (size.width / Math.max(1, size.height));
    const looks = mobile ? MOBILE_LOOKS.map((i) => LOOKS[i]) : LOOKS;
    const scatter = mobile ? MOBILE_SCATTER : DESKTOP_SCATTER;
    const slots: Slot[] = [];
    looks.forEach((lk, k) => {
      (["bottom", "top"] as const).forEach((role) => {
        const id = role === "top" ? lk.top : lk.bottom;
        const f = scatter[id];
        const depth = (CAM_Z - f.z) / CAM_Z;
        const h = (mobile ? BASE_HEIGHT.mobile : BASE_HEIGHT.desktop) * vh * f.s;
        slots.push({ ...f, id, role, look: k, sx: f.x * vw * depth, sy: f.y * vh * depth, sz: f.z, w: h * ASPECT, h, phase: slots.length * 1.7 + 0.4 });
      });
    });
    return { looks, slots };
  }, [mobile, size.width, size.height]);
}

type LookState = { x: number; y: number; z: number; rotY: number; sway: number; scale: number; fog: number; vis: number };

function Wardrobe({ progress, mobile, onReady, onLook, pointer }: {
  progress: RefObject<number>; mobile: boolean; onReady: () => void; onLook?: Props["onLook"]; pointer: RefObject<THREE.Vector2>;
}) {
  const { looks, slots } = useSlots(mobile);
  const ring = mobile ? RING.mobile : RING.desktop;
  const n = looks.length;
  const steps = mobile ? 4 : 5;
  const [loaded, setLoaded] = useState(0);
  const [textures] = useState(() => {
    const loader = new THREE.TextureLoader();
    return slots.map((sl) => {
      const t = loader.load(garment(sl.id), () => setLoaded((c) => c + 1));
      t.colorSpace = THREE.NoColorSpace; // shaders write sRGB as-is
      t.anisotropy = 4;
      return t;
    });
  });
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  const [uniforms] = useState(() => ({
    garments: textures.map((map, i) => ({
      garment: {
        uMap: { value: map }, uOpacity: { value: 0 }, uTime: { value: 0 }, uBend: { value: 1 }, uPhase: { value: i * 1.3 },
        uFog: { value: 0 }, uBlur: { value: 0 }, uBright: { value: 1 },
      },
      shadow: { uMap: { value: map }, uOpacity: { value: 0 } },
    })),
    floors: Array.from({ length: n }, () => ({ uOpacity: { value: 0 } })),
  }));
  const all = loaded >= slots.length;

  const groups = useRef<(THREE.Group | null)[]>([]);
  const shadows = useRef<(THREE.Mesh | null)[]>([]);
  const gMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const sMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const floors = useRef<(THREE.Mesh | null)[]>([]);
  const fMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const state = useRef({ p: 0, t0: -1, front: -1 });
  const lookState = useRef<LookState[]>(Array.from({ length: n }, () => ({ x: 0, y: 0, z: 0, rotY: 0, sway: 0, scale: 1, fog: 0, vis: 1 })));

  useFrame(({ clock }, dt) => {
    if (!all) return;
    const time = clock.elapsedTime;
    const s = state.current;
    if (s.t0 < 0) {
      s.t0 = time;
      onReady();
    }
    s.p = damp(s.p, progress.current, 9, Math.min(dt, 0.1));
    const P = s.p;
    const intro = time - s.t0;
    const pt = pointer.current;

    // Carousel turn, in looks: spins in while it fills, then clicks look by look, then drifts on into the dark.
    let turn: number;
    if (P < T.ringDone) turn = T.spinIn * (1 - easeOutCubic(clamp01((P - T.flyStart) / (T.ringDone - T.flyStart))));
    else if (P < T.rotEnd) turn = detent((steps * (P - T.ringDone)) / (T.rotEnd - T.ringDone));
    else turn = steps + 0.7 * easeInCubic((P - T.rotEnd) / (1 - T.rotEnd));
    const formed = easeOutCubic(clamp01((P - T.flyStart) / (T.ringDone - T.flyStart)));
    const away = easeInCubic(clamp01((P - T.rotEnd) / (1 - T.rotEnd)));
    const turnFx = turn - pt.x * 0.1 * formed;

    const front = (((Math.round(turn) % n) + n) % n);
    if (front !== s.front) {
      s.front = front;
      onLook?.(front, looks[front]);
    }

    // Where each look stands on the tilted ring.
    const step = (2 * Math.PI) / n;
    const tilt = (ring.tilt + pt.y * 2.5 * formed) * DEG;
    const st = Math.sin(tilt), ct = Math.cos(tilt);
    for (let k = 0; k < n; k++) {
      let phi = ((k - turnFx) * step) % (2 * Math.PI);
      if (phi > Math.PI) phi -= 2 * Math.PI;
      else if (phi <= -Math.PI) phi += 2 * Math.PI;
      const zl = ring.rz * Math.cos(phi);
      const f = (Math.cos(phi) + 1) / 2;
      const L = lookState.current[k];
      L.x = ring.cx + ring.rx * Math.sin(phi);
      L.y = ring.cy - zl * st;
      L.z = ring.cz + zl * ct - away * 2.5;
      L.rotY = phi * ring.facing;
      L.sway = Math.sin(time * 0.55 + k * 1.9) * 0.014;
      L.scale = 1 + 0.14 * Math.pow(f, 6);
      L.fog = Math.pow(1 - f, 1.15) * 0.78;
      // The look straight behind the front one would peek over it: let it melt into the haze.
      L.vis = clamp01((f - 0.02) / 0.28);

      const fl = floors.current[k];
      const fm = fMats.current[k];
      if (fl && fm) {
        fl.position.set(L.x, L.y - ring.garment * 1.03 * L.scale, L.z);
        fl.rotation.set(tilt - Math.PI / 2, 0, 0);
        fl.scale.setScalar(L.scale);
      }
    }

    slots.forEach((g, i) => {
      const grp = groups.current[i];
      const sh = shadows.current[i];
      const gm = gMats.current[i];
      const sm = sMats.current[i];
      if (!grp || !sh || !gm || !sm) return;
      const L = lookState.current[g.look];

      const ei = easeOutCubic(clamp01((intro - 0.1 - i * 0.05) / 1.7));
      // Back of the ring first, the front look last; the top lands onto its bottom.
      const f0 = (Math.cos(g.look * step) + 1) / 2;
      const start = T.flyStart + 0.1 * f0 + (g.role === "top" ? 0.025 : 0);
      const ek = easeInOutCubic(clamp01((P - start) / T.flySpan));
      const free = 1 - ek;

      const sx = g.sx + Math.sin(time * 0.23 + g.phase) * 0.1 + pt.x * (0.16 + 0.05 * g.sz) * free;
      const sy = g.sy + Math.sin(time * 0.31 + g.phase * 1.3) * 0.09 + pt.y * (0.16 + 0.05 * g.sz) * 0.7 * free;
      const sz = g.sz - (1 - ei) * 7;

      const top = g.role === "top";
      const oy = (top ? 0.4 : -0.5) * ring.garment * L.scale;
      const oz = top ? 0.02 : 0;
      const tx = L.x + oz * Math.sin(L.rotY) - oy * Math.sin(L.sway);
      const ty = L.y + oy * Math.cos(L.sway);
      const tz = L.z + oz * Math.cos(L.rotY);
      const arc = Math.sin(Math.PI * ek);

      grp.position.set(sx + (tx - sx) * ek, sy + (ty - sy) * ek + arc * 0.35, sz + (tz - sz) * ek + arc * 1.4);
      const target = ((top ? 0.95 : 1.12) * ring.garment * L.scale) / g.h;
      const sc = 1 + (target - 1) * ek;
      grp.scale.set(sc, sc, sc);
      grp.rotation.set(
        (Math.sin(time * 0.15 + g.phase) * 0.12 - pt.y * 0.08) * free,
        (Math.sin(time * 0.17 + g.phase) * 0.28 + pt.x * 0.12) * free + L.rotY * ek,
        (g.r * DEG + Math.sin(time * 0.2 + g.phase) * 2.5 * DEG) * free + L.sway * ek,
      );

      const fog = L.fog * ek;
      gm.uniforms.uTime.value = time;
      gm.uniforms.uOpacity.value = ei * (1 + (L.vis - 1) * ek);
      gm.uniforms.uBend.value = 1 - 0.72 * ek;
      gm.uniforms.uFog.value = fog;
      gm.uniforms.uBlur.value = fog * 3.0;
      gm.uniforms.uBright.value = 1 + (0.96 + 0.07 * Math.pow(1 - L.fog / 0.78, 3) - 1) * ek;
      // Drop shadow while floating; just a whisper once the piece is part of a look.
      sh.position.set(g.w * 0.05 * free, -g.h * 0.06 * free, -0.03);
      sm.uniforms.uOpacity.value = ei * (0.42 * free + 0.12 * ek * (1 - fog) * L.vis);

      if (!top) {
        const fm = fMats.current[g.look];
        if (fm) fm.uniforms.uOpacity.value = ek * 0.3 * (1 - 0.85 * L.fog) * L.vis;
      }
    });
  });

  return (
    <>
      {looks.map((lk, k) => (
        <mesh key={lk.name} renderOrder={-1} ref={(el) => { floors.current[k] = el; }}>
          <planeGeometry args={[ring.garment * 1.05, ring.garment * 0.42]} />
          <shaderMaterial
            ref={(el) => { fMats.current[k] = el; }}
            vertexShader={shadowVertex}
            fragmentShader={floorFragment}
            uniforms={uniforms.floors[k]}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}
      {slots.map((g, i) => (
        <group key={g.id} rotation-order="YXZ" ref={(el) => { groups.current[i] = el; }}>
          <mesh ref={(el) => { shadows.current[i] = el; }}>
            <planeGeometry args={[g.w * 1.06, g.h * 1.06]} />
            <shaderMaterial
              ref={(el) => { sMats.current[i] = el; }}
              vertexShader={shadowVertex}
              fragmentShader={shadowFragment}
              uniforms={uniforms.garments[i].shadow}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <planeGeometry args={[g.w, g.h, 14, 14]} />
            <shaderMaterial
              ref={(el) => { gMats.current[i] = el; }}
              vertexShader={garmentVertex}
              fragmentShader={garmentFragment}
              uniforms={uniforms.garments[i].garment}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Satin({ progress, pointer }: { progress: RefObject<number>; pointer: RefObject<THREE.Vector2> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2() },
    uProgress: { value: 0 },
  }));
  useFrame(({ clock, size }) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value = clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    u.uPointer.value.copy(pointer.current);
    u.uProgress.value = clamp01((progress.current - 0.1) / 0.36) * 0.5;
  });
  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={satinVertex}
        fragmentShader={satinFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function Pointer({ target, enabled }: { target: RefObject<THREE.Vector2>; enabled: boolean }) {
  const raw = useRef(new THREE.Vector2());
  useEffect(() => {
    if (!enabled) return;
    const on = (e: PointerEvent) => raw.current.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [enabled]);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    target.current.set(damp(target.current.x, raw.current.x, 2.6, d), damp(target.current.y, raw.current.y, 2.6, d));
  });
  return null;
}

export default function HeroScene({ progress, mobile, active, onReady, onLook }: Props) {
  const pointer = useRef(new THREE.Vector2());
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      flat
      linear
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: FOV, position: [0, 0, CAM_Z], near: 0.1, far: 40 }}
      aria-hidden
    >
      <color attach="background" args={["#faf7f2"]} />
      <Pointer target={pointer} enabled={!mobile} />
      <Satin progress={progress} pointer={pointer} />
      <Wardrobe key={mobile ? "m" : "d"} progress={progress} mobile={mobile} onReady={onReady} onLook={onLook} pointer={pointer} />
    </Canvas>
  );
}
