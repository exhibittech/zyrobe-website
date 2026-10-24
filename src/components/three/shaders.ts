// GLSL for the hero scene. Colours are written in sRGB directly (no colour-space
// conversion), so they match the CSS brand tokens exactly.

const noise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

/** Full-screen quad: geometry is a 2x2 plane drawn straight into clip space. */
export const satinVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/** Slow, calm cream satin: broad diagonal folds, raking light that leans towards the pointer. */
export const satinFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;
uniform float uProgress;
varying vec2 vUv;
${noise}

float folds(vec2 p, float t) {
  // Long folds running from top-left to bottom-right, like the brand satin photo.
  vec2 n = normalize(vec2(0.55, 1.0));   // across the folds
  vec2 d = vec2(n.y, -n.x);              // along the folds
  float u = dot(p, n);
  float v = dot(p, d);
  u += 0.32 * sin(v * 0.65 + t * 0.07) + 0.16 * snoise(vec2(v * 0.32, t * 0.03));
  float h = 0.62 * sin(u * 2.0 + 0.3 * sin(v * 1.05 - t * 0.05) + t * 0.11);
  h += 0.26 * sin(u * 3.6 + v * 0.32 + 1.7 - t * 0.08);
  h += 0.10 * sin(u * 6.1 - v * 0.55 + t * 0.05);
  return h;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0) * 2.2;
  float t = uTime;
  float e = 0.012;
  float h = folds(p, t);
  float hx = folds(p + vec2(e, 0.0), t);
  float hy = folds(p + vec2(0.0, e), t);
  vec3 n = normalize(vec3(-(hx - h) / e * 0.3, -(hy - h) / e * 0.3, 1.0));

  vec3 L = normalize(vec3(-0.55 + uPointer.x * 0.35, 0.62 + uPointer.y * 0.25, 0.62));
  float diff = clamp(dot(n, L), 0.0, 1.0);
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float nh = max(dot(n, H), 0.0);
  float sheen = pow(nh, 9.0) * 0.2 + pow(nh, 60.0) * 0.14;

  vec3 shadowC = vec3(0.835, 0.765, 0.660);  // #d5c3a8
  vec3 midC    = vec3(0.925, 0.886, 0.827);  // #ece2d3
  vec3 lightC  = vec3(0.980, 0.969, 0.949);  // #faf7f2
  float k = smoothstep(0.38, 1.0, diff);
  vec3 col = mix(shadowC, midC, smoothstep(0.0, 0.6, k));
  col = mix(col, lightC, smoothstep(0.55, 1.0, k));
  col += sheen * vec3(1.0, 0.985, 0.955);

  // "Lights on" as the wardrobe sorts itself: the cloth brightens and calms.
  col = mix(col, mix(col, lightC, 0.45), uProgress);

  // Soft vignette towards warm sand, and dithering against banding.
  vec2 v = vUv - 0.5;
  col *= 1.0 - dot(v, v) * 0.16;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0 * 1.5;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** A cut-out garment as light cloth: a gentle curve across its width and a slow ripple, flattening to a card when sorted. */
export const garmentVertex = /* glsl */ `
uniform float uTime;
uniform float uBend;
uniform float uPhase;
varying vec2 vUv;
varying float vShade;
void main() {
  vUv = uv;
  vec3 p = position;
  float x = uv.x - 0.5;
  float a = uv.y * 3.1 + uTime * 0.85 + uPhase;
  float b = uv.x * 4.0 - uTime * 0.6 + uPhase * 1.7;
  float rip = sin(a) * 0.035 + sin(b) * 0.02;
  p.z += (-x * x * 0.55 + rip) * uBend;
  float dzdx = (-x * 1.1 + cos(b) * 0.08) * uBend;
  float dzdy = cos(a) * 0.108 * uBend;
  vShade = clamp(1.0 - dzdx * 0.5 + dzdy * 0.45, 0.84, 1.08);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

export const garmentFragment = /* glsl */ `
uniform sampler2D uMap;
uniform float uOpacity;
varying vec2 vUv;
varying float vShade;
void main() {
  vec4 c = texture2D(uMap, vUv);
  if (c.a < 0.003) discard;
  gl_FragColor = vec4(c.rgb * vShade, c.a * uOpacity);
}
`;

/** Soft contact shadow from the garment's own alpha (blurred via mip bias). */
export const shadowVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const shadowFragment = /* glsl */ `
uniform sampler2D uMap;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * 1.08 + 0.5;
  float a = texture2D(uMap, uv, 3.0).a * 0.4;
  a += texture2D(uMap, uv + vec2(0.03, 0.0), 3.5).a * 0.15;
  a += texture2D(uMap, uv - vec2(0.03, 0.0), 3.5).a * 0.15;
  a += texture2D(uMap, uv + vec2(0.0, 0.03), 3.5).a * 0.15;
  a += texture2D(uMap, uv - vec2(0.0, 0.03), 3.5).a * 0.15;
  // The cut-outs touch the image border: fade out instead of smearing the clamped edge.
  vec2 m = smoothstep(vec2(0.0), vec2(0.08), uv) * smoothstep(vec2(1.0), vec2(0.92), uv);
  a *= m.x * m.y;
  gl_FragColor = vec4(0.18, 0.11, 0.07, a * uOpacity);
}
`;

/** Wardrobe tile behind a sorted garment: paper card with rounded corners and a soft lift shadow. */
export const cardFragment = /* glsl */ `
uniform float uOpacity;
uniform vec2 uSize;   // card size in world units
uniform float uPad;   // plane = card + 2 * pad (room for the shadow)
varying vec2 vUv;
float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main() {
  vec2 full = uSize + 2.0 * uPad;
  vec2 p = (vUv - 0.5) * full;
  float r = 0.09 * min(uSize.x, uSize.y);
  float d = sdRound(p, uSize * 0.5, r);
  float aa = fwidth(d);
  float card = 1.0 - smoothstep(-aa, aa, d);
  // Lift shadow: tucked under the card, falling downwards.
  float ds = sdRound(p - vec2(0.0, -uPad * 0.38), uSize * 0.5 - vec2(uPad * 0.18), r);
  float sh = (1.0 - smoothstep(-uPad * 0.45, uPad * 0.95, ds)) * 0.17;
  float border = 1.0 - smoothstep(aa * 0.6, aa * 1.9, abs(d + aa * 1.3));
  vec3 paper = mix(vec3(0.984, 0.975, 0.957), vec3(1.0, 0.996, 0.988), vUv.y);
  paper = mix(paper, vec3(0.86, 0.82, 0.76), border * 0.5);
  vec3 shadowC = vec3(0.18, 0.11, 0.07);
  float a = card + sh * (1.0 - card);
  vec3 col = (paper * card + shadowC * sh * (1.0 - card)) / max(a, 1e-4);
  gl_FragColor = vec4(col, a * uOpacity);
}
`;
