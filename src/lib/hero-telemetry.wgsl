struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn segmentDistance(p: vec2f, a: vec2f, b: vec2f) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

fn linkSignal(p: vec2f, a: vec2f, b: vec2f, phase: f32, t: f32) -> vec2f {
  let pa = p - a;
  let ba = b - a;
  let along = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  let distance = segmentDistance(p, a, b);
  let line = exp(-distance * 150.0);
  let packetPosition = fract(t * 0.08 + phase);
  let packetDistance = abs(along - packetPosition);
  let wrappedDistance = min(packetDistance, 1.0 - packetDistance);
  let packet = exp(-wrappedDistance * 60.0) * exp(-distance * 230.0);
  return vec2f(line, packet);
}

fn nodeSignal(p: vec2f, center: vec2f, phase: f32, t: f32) -> vec2f {
  let distance = length(p - center);
  let core = exp(-distance * 95.0);
  let ringRadius = 0.025 + 0.018 * fract(t * 0.12 + phase);
  let ring = exp(-abs(distance - ringRadius) * 190.0)
    * (1.0 - fract(t * 0.12 + phase));
  return vec2f(core, ring);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;

  let n0 = vec2f(0.05, -0.24);
  let n1 = vec2f(0.23, -0.11);
  let n2 = vec2f(0.13, 0.08);
  let n3 = vec2f(0.36, 0.18);
  let n4 = vec2f(0.47, -0.02);
  let n5 = vec2f(0.31, -0.31);

  var lines = vec2f(0.0);
  lines += linkSignal(p, n0, n1, 0.08, t);
  lines += linkSignal(p, n0, n2, 0.28, t);
  lines += linkSignal(p, n1, n2, 0.45, t);
  lines += linkSignal(p, n1, n4, 0.62, t);
  lines += linkSignal(p, n2, n3, 0.78, t);
  lines += linkSignal(p, n3, n4, 0.14, t);
  lines += linkSignal(p, n1, n5, 0.36, t);
  lines += linkSignal(p, n5, n4, 0.92, t);

  var nodes = vec2f(0.0);
  nodes += nodeSignal(p, n0, 0.0, t);
  nodes += nodeSignal(p, n1, 0.17, t);
  nodes += nodeSignal(p, n2, 0.34, t);
  nodes += nodeSignal(p, n3, 0.51, t);
  nodes += nodeSignal(p, n4, 0.68, t);
  nodes += nodeSignal(p, n5, 0.85, t);

  let gridCell = floor(uv * vec2f(40.0, 22.0));
  let sparkHash = hash21(gridCell);
  let spark = step(0.982, sparkHash)
    * (0.35 + 0.65 * sin(t * 1.3 + sparkHash * 32.0));

  let blue = vec3f(0.08, 0.34, 0.68);
  let red = vec3f(0.76, 0.10, 0.16);
  let paper = vec3f(0.95, 0.91, 0.82);
  let rightField = smoothstep(0.28, 0.58, uv.x);
  let network = lines.x * 0.12 + nodes.x * 0.22;
  let signal = lines.y * 0.48 + nodes.y * 0.2 + spark * 0.04;
  var alpha = clamp((network + signal) * rightField, 0.0, 0.42);
  let color = mix(blue, red, clamp(signal * 1.8, 0.0, 1.0));
  let softened = mix(color, paper, 0.08 + spark * 0.25);
  alpha *= 0.82;
  return vec4f(softened * alpha, alpha);
}
