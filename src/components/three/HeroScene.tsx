"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { BASE_HEIGHT, DESKTOP_SCATTER, MOBILE_SCATTER, garment, type Float } from "./heroLayout";
import { garmentFragment, garmentVertex, satinFragment, satinVertex, shadowFragment, shadowVertex } from "./shaders";

type Props = {
  /** 0..1 scroll progress through the hero (written by ScrollTrigger, read every frame). */
  progress: RefObject<number>;
  mobile: boolean;
  /** Render only while the hero is on screen. */
  active: boolean;
  onReady: () => void;
};

const FOV = 35;
const CAM_Z = 10;
const ASPECT = 315 / 399; // garment cut-out images

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const DEG = Math.PI / 180;

type Slot = Float & { id: string; sx: number; sy: number; sz: number; w: number; h: number; phase: number };

function useSlots(mobile: boolean) {
  const size = useThree((s) => s.size);
  return useMemo(() => {
    const vh = 2 * Math.tan((FOV / 2) * DEG) * CAM_Z;
    const vw = vh * (size.width / Math.max(1, size.height));
    const scatter = mobile ? MOBILE_SCATTER : DESKTOP_SCATTER;
    return Object.entries(scatter).map(([id, f], i): Slot => {
      const depth = (CAM_Z - f.z) / CAM_Z;
      const h = (mobile ? BASE_HEIGHT.mobile : BASE_HEIGHT.desktop) * vh * f.s;
      return { ...f, id, sx: f.x * vw * depth, sy: f.y * vh * depth, sz: f.z, w: h * ASPECT, h, phase: i * 1.7 + 0.4 };
    });
  }, [mobile, size.width, size.height]);
}

/** The garments float around the headline, lean towards the pointer, and part as the page scrolls on. */
function Wardrobe({ progress, mobile, onReady, pointer }: {
  progress: RefObject<number>; mobile: boolean; onReady: () => void; pointer: RefObject<THREE.Vector2>;
}) {
  const slots = useSlots(mobile);
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
  const [uniforms] = useState(() =>
    textures.map((map, i) => ({
      garment: {
        uMap: { value: map }, uOpacity: { value: 0 }, uTime: { value: 0 }, uBend: { value: 1 }, uPhase: { value: i * 1.3 },
        uFog: { value: 0 }, uBlur: { value: 0 }, uBright: { value: 1 },
      },
      shadow: { uMap: { value: map }, uOpacity: { value: 0 } },
    })),
  );
  const all = loaded >= slots.length;

  const groups = useRef<(THREE.Group | null)[]>([]);
  const gMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const sMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const state = useRef({ p: 0, t0: -1 });

  useFrame(({ clock }, dt) => {
    if (!all) return;
    const time = clock.elapsedTime;
    const s = state.current;
    if (s.t0 < 0) {
      s.t0 = time;
      onReady();
    }
    s.p = damp(s.p, progress.current, 9, Math.min(dt, 0.1));
    const intro = time - s.t0;
    const pt = pointer.current;
    // Scrolling on: the pieces part outwards and drift past the camera as the dark section rises over them.
    const part = easeInOutCubic(clamp01(s.p / 0.8));

    slots.forEach((g, i) => {
      const grp = groups.current[i];
      const gm = gMats.current[i];
      const sm = sMats.current[i];
      if (!grp || !gm || !sm) return;

      const ei = easeOutCubic(clamp01((intro - 0.1 - i * 0.05) / 1.7));
      const lean = 0.16 + 0.05 * g.sz;
      grp.position.set(
        g.sx * (1 + 0.55 * part) + Math.sin(time * 0.23 + g.phase) * 0.1 + pt.x * lean,
        g.sy * (1 + 0.3 * part) + part * 0.9 + Math.sin(time * 0.31 + g.phase * 1.3) * 0.09 + pt.y * lean * 0.7,
        g.sz - (1 - ei) * 7 + part * 3.2,
      );
      grp.rotation.set(
        Math.sin(time * 0.15 + g.phase) * 0.12 - pt.y * 0.08,
        Math.sin(time * 0.17 + g.phase) * 0.28 + pt.x * 0.12 + part * Math.sign(g.x) * 0.5,
        (g.r * (1 + part) + Math.sin(time * 0.2 + g.phase) * 2.5) * DEG,
      );

      gm.uniforms.uTime.value = time;
      gm.uniforms.uOpacity.value = ei;
      sm.uniforms.uOpacity.value = ei * 0.42;
    });
  });

  return (
    <>
      {slots.map((g, i) => (
        <group key={g.id} rotation-order="YXZ" ref={(el) => { groups.current[i] = el; }}>
          <mesh position={[g.w * 0.05, -g.h * 0.06, -0.03]}>
            <planeGeometry args={[g.w * 1.06, g.h * 1.06]} />
            <shaderMaterial
              ref={(el) => { sMats.current[i] = el; }}
              vertexShader={shadowVertex}
              fragmentShader={shadowFragment}
              uniforms={uniforms[i].shadow}
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
              uniforms={uniforms[i].garment}
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
    u.uProgress.value = clamp01(progress.current / 0.6) * 0.5;
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

export default function HeroScene({ progress, mobile, active, onReady }: Props) {
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
      <Wardrobe key={mobile ? "m" : "d"} progress={progress} mobile={mobile} onReady={onReady} pointer={pointer} />
    </Canvas>
  );
}
