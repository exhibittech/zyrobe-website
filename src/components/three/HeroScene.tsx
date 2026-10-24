"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { BASE_HEIGHT, DESKTOP, GRID, MOBILE, type Piece } from "./heroLayout";
import {
  cardFragment,
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
};

const FOV = 35;
const CAM_Z = 10;
const ASPECT = 315 / 399; // garment cut-out images

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
const damp = (a: number, b: number, lambda: number, dt: number) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const DEG = Math.PI / 180;

type Laid = Piece & {
  sx: number; sy: number; sz: number; w: number; h: number;
  gx: number; gy: number; gs: number; order: number; phase: number;
};

function useLayout(pieces: Piece[], mobile: boolean) {
  const size = useThree((s) => s.size);
  return useMemo(() => {
    const vh = 2 * Math.tan((FOV / 2) * DEG) * CAM_Z;
    const vw = vh * (size.width / Math.max(1, size.height));
    const grid = mobile ? GRID.mobile : GRID.desktop;
    let cellW = (vw * grid.width) / grid.cols;
    let cellH = cellW * 1.3;
    if (cellH * grid.rows > vh * grid.maxHeight) {
      cellH = (vh * grid.maxHeight) / grid.rows;
      cellW = cellH / 1.3;
    }
    const gap = cellW * 0.09;
    const card = { w: cellW - gap, h: cellH - gap };
    const n = pieces.length;
    const laid: Laid[] = pieces.map((p, i) => {
      const depth = (CAM_Z - p.z) / CAM_Z;
      const h = (mobile ? BASE_HEIGHT.mobile : BASE_HEIGHT.desktop) * vh * p.s;
      const gh = card.h * 0.8;
      return {
        ...p,
        sx: p.x * vw * depth,
        sy: p.y * vh * depth,
        sz: p.z,
        w: h * ASPECT,
        h,
        gx: (p.col - (grid.cols - 1) / 2) * cellW,
        gy: ((grid.rows - 1) / 2 - p.row) * cellH + grid.lift * vh,
        gs: gh / h,
        order: (p.row * grid.cols + p.col) / Math.max(1, n - 1),
        phase: i * 1.7 + 0.4,
      };
    });
    return { laid, card, vw, vh };
  }, [pieces, mobile, size.width, size.height]);
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
    u.uProgress.value = progress.current;
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

function Wardrobe({ progress, mobile, onReady, pointer }: {
  progress: RefObject<number>; mobile: boolean; onReady: () => void; pointer: RefObject<THREE.Vector2>;
}) {
  const pieces = mobile ? MOBILE : DESKTOP;
  const [loaded, setLoaded] = useState(0);
  const [textures] = useState(() => {
    const loader = new THREE.TextureLoader();
    return pieces.map((p) => {
      const t = loader.load(p.src, () => setLoaded((n) => n + 1));
      t.colorSpace = THREE.NoColorSpace; // shaders write sRGB as-is
      t.anisotropy = 4;
      return t;
    });
  });
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  const [uniforms] = useState(() =>
    textures.map((map, i) => ({
      garment: { uMap: { value: map }, uOpacity: { value: 0 }, uTime: { value: 0 }, uBend: { value: 1 }, uPhase: { value: i * 1.3 } },
      shadow: { uMap: { value: map }, uOpacity: { value: 0 } },
      card: { uOpacity: { value: 0 }, uSize: { value: new THREE.Vector2(1, 1) }, uPad: { value: 0.2 } },
    })),
  );
  const { laid, card } = useLayout(pieces, mobile);
  const pad = Math.min(card.w, card.h) * 0.22;
  const all = loaded >= pieces.length;

  const groups = useRef<(THREE.Group | null)[]>([]);
  const shadows = useRef<(THREE.Mesh | null)[]>([]);
  const cards = useRef<(THREE.Mesh | null)[]>([]);
  const gMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const sMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const cMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
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
    const P = s.p;
    const intro = time - s.t0;
    const pt = pointer.current;

    laid.forEach((g, i) => {
      const grp = groups.current[i];
      const sh = shadows.current[i];
      const cd = cards.current[i];
      const gm = gMats.current[i];
      const sm = sMats.current[i];
      const cm = cMats.current[i];
      if (!grp || !sh || !cd || !gm || !sm || !cm) return;

      const ei = easeOutCubic(clamp01((intro - 0.1 - i * 0.055) / 1.7));
      const tk = clamp01((P - (0.06 + g.order * 0.26)) / 0.4);
      const ek = easeInOutQuart(tk);
      const free = 1 - ek;

      const dx = Math.sin(time * 0.23 + g.phase) * 0.1;
      const dy = Math.sin(time * 0.31 + g.phase * 1.3) * 0.09;
      const par = 0.16 + 0.05 * g.sz;
      const sx = g.sx + dx + pt.x * par;
      const sy = g.sy + dy + pt.y * par * 0.7;
      const sz = g.sz - (1 - ei) * 7;

      grp.position.set(
        sx + (g.gx - sx) * ek,
        sy + (g.gy - sy) * ek,
        sz + (0 - sz) * ek + Math.sin(Math.PI * ek) * 1.1,
      );
      const bump = 1 + 0.045 * Math.sin(Math.PI * clamp01((tk - 0.8) / 0.2));
      const sc = (1 + (g.gs - 1) * ek) * bump;
      grp.scale.set(sc, sc, sc);
      grp.rotation.set(
        Math.sin(time * 0.15 + g.phase) * 0.12 * free - pt.y * 0.08 * free,
        Math.sin(time * 0.17 + g.phase) * 0.28 * free + pt.x * 0.12 * free,
        (g.r * DEG + Math.sin(time * 0.2 + g.phase) * 2.5 * DEG) * free,
      );

      gm.uniforms.uTime.value = time;
      gm.uniforms.uOpacity.value = ei;
      gm.uniforms.uBend.value = free;
      // Shadow falls further while floating, tucks in when the piece lands on its card.
      sh.position.set(g.w * (0.05 * free + 0.01), -g.h * (0.06 * free + 0.015), -0.03);
      sm.uniforms.uOpacity.value = ei * (0.42 * free + 0.18);

      const ce = easeOutCubic(clamp01((tk - 0.55) / 0.45));
      cd.position.set(g.gx, g.gy - card.h * 0.035, -0.06);
      const cs = 0.9 + 0.1 * ce;
      cd.scale.set(cs, cs, 1);
      cm.uniforms.uOpacity.value = ce;
      cm.uniforms.uSize.value.set(card.w, card.h);
      cm.uniforms.uPad.value = pad;
    });
  });

  return (
    <>
      {laid.map((g, i) => (
        <group key={g.src}>
          <mesh ref={(el) => { cards.current[i] = el; }}>
            <planeGeometry args={[card.w + 2 * pad, card.h + 2 * pad]} />
            <shaderMaterial
              ref={(el) => { cMats.current[i] = el; }}
              vertexShader={shadowVertex}
              fragmentShader={cardFragment}
              uniforms={uniforms[i].card}
              transparent
              depthWrite={false}
            />
          </mesh>
          <group ref={(el) => { groups.current[i] = el; }}>
            <mesh ref={(el) => { shadows.current[i] = el; }}>
              <planeGeometry args={[g.w * 1.06, g.h * 1.06]} />
              <shaderMaterial
                ref={(el) => { sMats.current[i] = el; }}
                vertexShader={shadowVertex}
                fragmentShader={shadowFragment}
                uniforms={uniforms[i].shadow}
                transparent
                depthWrite={false}
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
              />
            </mesh>
          </group>
        </group>
      ))}
    </>
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
