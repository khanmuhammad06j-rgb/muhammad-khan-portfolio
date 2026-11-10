import * as THREE from 'three';

/* ------------------------------------------------------------------------ *
 *  Portrait in Dots engine
 *  Renders the whole photo as ~116k dots: the person as a 3D relief whose
 *  head follows the cursor, the background as a quieter, shallow layer.
 *  A Reveal sweeps the dots onto the real photo through a grid of circles.
 * ------------------------------------------------------------------------ */

const CRIMSON = new THREE.Color(0.64, 0.035, 0.055);
const MAX_YAW = THREE.MathUtils.degToRad(26);
const MAX_PITCH = THREE.MathUtils.degToRad(12);
const REVEAL_MS = 3600;

const ADD = {
  transparent: true, depthTest: false, depthWrite: false,
  blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
  blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
  blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneFactor,
};

const dotsVert = /* glsl */ `
  attribute vec3 aNormal;
  attribute float aRand, aBright, aCls;
  attribute vec3 aRing;
  uniform float uIntro, uYaw, uPitch, uNeckY, uChestY, uPx;
  uniform vec3 uPivot;
  uniform vec2 uMouse, uPhotoHalf;
  uniform float uMouseOn, uSweep, uSweepOn, uBand, uRevealOn;
  uniform sampler2D uPhoto;
  uniform vec3 uColor;
  uniform vec3 uSpacing;
  varying vec3 vCol;
  varying float vAlpha;
  varying float vPx;

  vec3 rot(vec3 q, float yaw, float pitch) {
    float cy = cos(yaw), sy = sin(yaw);
    q = vec3(cy * q.x + sy * q.z, q.y, -sy * q.x + cy * q.z);
    float cp = cos(pitch), sp = sin(pitch);
    return vec3(q.x, cp * q.y - sp * q.z, sp * q.y + cp * q.z);
  }

  void main() {
    vec3 p = position;
    // person: head turns fully, shoulders follow a little, lower body stays put
    float head = smoothstep(uNeckY - 0.14, uNeckY + 0.07, p.y);
    float body = smoothstep(uChestY - 0.30, uChestY + 0.05, p.y) * 0.16;
    bool isP = aCls > 0.5;
    float k = isP ? max(head, body) : 0.06;   // background: faint parallax only
    vec3 q = rot(p - uPivot, uYaw * k, uPitch * k) + uPivot;
    vec3 n = normalize(rot(aNormal, uYaw * k, uPitch * k));

    float r = uRevealOn * clamp((p.y - uBand) / 0.14, 0.0, 1.0);
    vec3 pos = mix(q, vec3(p.xy, 0.0), r);

    float t = clamp(uIntro * 1.55 - aRand * 0.55, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 fly = mix(aRing, pos, t);
    fly.z += sin(t * 3.14159) * (aRand - 0.5) * 0.6;

    vec3 L = normalize(vec3(-0.45, 0.55, 0.7));
    float diff = max(dot(n, L), 0.0);
    float rim = pow(1.0 - max(n.z, 0.0), 2.2);
    vec3 dl = vec3(uMouse, 0.75) - q;
    float att = 1.0 / (1.0 + 5.0 * dot(dl, dl));
    float ml = max(dot(n, normalize(dl)), 0.0) * att * uMouseOn;
    float sweep = uSweepOn * exp(-pow((p.y - uSweep) / 0.045, 2.0));
    // halftone of the real photo: light areas -> big circles, dark areas -> small ones,
    // modulated by the 3D shading and the cursor light
    vec2 uv0 = vec2(p.x / (2.0 * uPhotoHalf.x) + 0.5, p.y / (2.0 * uPhotoHalf.y) + 0.5);
    float lum = dot(texture2D(uPhoto, uv0).rgb, vec3(0.299, 0.587, 0.114));
    float shade = 0.88 + 0.28 * diff + 0.3 * rim;
    float tone = isP ? mix(lum * 1.15, aBright * 0.8, 0.3) * shade + 0.9 * ml
                     : lum * 0.72 + 0.6 * ml;
    tone = clamp(tone + (isP ? 0.08 : 0.0), 0.0, 1.0);
    float I = (isP ? 2.3 : 0.85) * (0.9 + 0.6 * ml) + sweep * 1.4;

    vec2 uv = vec2(p.x / (2.0 * uPhotoHalf.x) + 0.5, p.y / (2.0 * uPhotoHalf.y) + 0.5);
    vec3 photo = texture2D(uPhoto, uv).rgb;
    vCol = mix(uColor * I, photo, r);
    vAlpha = (1.0 - smoothstep(0.45, 1.0, r)) * smoothstep(0.0, 0.05, t + 0.02);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(fly, 1.0);
    float spacing = aCls > 1.5 ? uSpacing.x : (aCls > 0.5 ? uSpacing.y : uSpacing.z);
    float diam = spacing * mix(0.24 + 0.86 * pow(tone, 0.6), 1.02, r);   // flattens to full dots on reveal
    vPx = max(1.0, diam * uPx);
    gl_PointSize = vPx;
  }
`;
const dotsFrag = /* glsl */ `
  varying vec3 vCol;
  varying float vAlpha;
  varying float vPx;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float aa = 1.0 / max(vPx, 1.0);
    float a = (1.0 - smoothstep(0.5 - aa, 0.5, d)) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(min(vCol, vec3(1.0)) * a, a);
  }
`;
const photoVert = /* glsl */ `
  varying vec2 vUv; varying vec2 vW;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vW = wp.xy;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const photoFrag = /* glsl */ `
  uniform sampler2D uPhoto;
  uniform float uBand, uRevealOn, uDim, uCell;
  varying vec2 vUv; varying vec2 vW;
  void main() {
    vec4 ph = texture2D(uPhoto, vUv);
    float c = uRevealOn * clamp((vW.y - uBand) / 0.32, 0.0, 1.0);
    vec2 cell = fract(vW / uCell) - 0.5;
    float rad = c * 0.74;
    float open = c >= 0.999 ? 1.0 : smoothstep(rad, rad - 0.08, length(cell));
    float glow = uRevealOn * exp(-pow((vW.y - uBand) / 0.012, 2.0));
    vec3 col = ph.rgb * open + vec3(0.64, 0.035, 0.055) * glow * 0.8;
    float a = max(open, uDim);
    a = max(a, glow * 0.8);
    gl_FragColor = vec4(min(col, vec3(a)), a);
  }
`;
const dustVert = /* glsl */ `
  attribute float aRand;
  uniform float uTime, uPx, uFade;
  varying float vA;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.05 + aRand * 40.0) * 0.06;
    p.y = mod(p.y + uTime * (0.006 + aRand * 0.012) + 1.1, 2.2) - 1.1;
    vA = (0.15 + 0.5 * aRand) * uFade * (0.6 + 0.4 * sin(uTime * (0.6 + aRand) + aRand * 9.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (0.6 + aRand * 1.6) * uPx * 0.0024;
  }
`;
const dustFrag = /* glsl */ `
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vA;
    gl_FragColor = vec4(vec3(0.55, 0.18, 0.2) * a, a);
  }
`;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

async function fetchWithProgress(urls, onProgress) {
  const res = await Promise.all(urls.map((u) => fetch(u)));
  const totals = res.map((r) => Number(r.headers.get('content-length')) || 0);
  const total = totals.reduce((a, b) => a + b, 0);
  let got = 0;
  const out = [];
  for (const r of res) {
    if (!r.ok || !r.body) throw new Error('load failed');
    const reader = r.body.getReader(); const chunks = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); got += value.length;
      if (total) onProgress(got / total);
    }
    out.push(new Blob(chunks));
  }
  onProgress(1);
  return out;
}

async function decodeEmbedded(ids, onProgress) {
  const parts = ids.map((id) => document.getElementById(id).textContent.trim());
  const total = parts.reduce((a, s) => a + s.length, 0);
  let done = 0; const out = [];
  for (const [i, b64] of parts.entries()) {
    const CH = 1 << 18;
    const pad = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
    const bytes = new Uint8Array(Math.floor((b64.length * 3) / 4) - pad);
    let o = 0;
    for (let s = 0; s < b64.length; s += CH) {
      const bin = atob(b64.slice(s, s + CH));
      for (let k = 0; k < bin.length; k++) bytes[o++] = bin.charCodeAt(k);
      done += Math.min(CH, b64.length - s); onProgress(done / total);
      await new Promise((r) => setTimeout(r, 0));
    }
    out.push(new Blob([bytes], { type: i === 1 ? 'image/webp' : 'application/octet-stream' }));
  }
  return out;
}

/**
 * mountDotHero({ meta, box, canvas, loader, arc, pct, hint, bannerHot, bannerEl, src })
 *  src: { urls: [dotsUrl, photoUrl] } or { embedded: [dotsScriptId, photoScriptId] }
 */
export function mountDotHero(o) {
  const { meta, box, canvas, loader, arc, pct, hint, bannerHot, bannerEl } = o;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ASPECT = meta.aspect;
  let disposed = false, raf = 0, visible = true, failed = false;

  // JavaScript is running: hide the plain photo and show the loader instead.
  box.classList.add('dh-js');
  // Anything goes wrong -> show the real photo, never an empty black frame.
  const fallback = () => {
    if (failed) return;
    failed = true;
    box.classList.add('dh-nogl');
    loader && loader.classList.add('done');
    cancelAnimationFrame(raf);
  };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
    if (!renderer.getContext()) throw new Error('no webgl');
  } catch (e) {
    fallback();
    return { destroy() {} };
  }
  renderer.debug.onShaderError = () => fallback();
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); fallback(); });
  const watchdog = setTimeout(() => { if (st.phase === 'loading') fallback(); }, 15000);
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-ASPECT, ASPECT, 1, -1, -10, 10);
  camera.position.z = 5;
  let rect = box.getBoundingClientRect(), pxPerUnit = 1, cssPerUnit = 1;
  let dotsMat, photoMat, dustMat;

  function resize() {
    rect = box.getBoundingClientRect();
    const w = Math.max(1, rect.width), h = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    // cover the box with the photo (box is the photo's aspect, so this is an exact fit)
    const boxA = w / h;
    let fh = 2, fw = 2 * ASPECT;
    if (boxA > ASPECT) fh = fw / boxA; else fw = fh * boxA;
    const cy = Math.min(0.17, (2 - fh) / 2);          // crop from the bottom first, keep the head in view
    camera.left = -fw / 2; camera.right = fw / 2; camera.top = fh / 2 + cy; camera.bottom = -fh / 2 + cy;
    camera.updateProjectionMatrix();
    pxPerUnit = (h * dpr) / fh; cssPerUnit = h / fh;
    if (dotsMat) dotsMat.uniforms.uPx.value = pxPerUnit;
    if (dustMat) dustMat.uniforms.uPx.value = pxPerUnit;
  }
  const ro = new ResizeObserver(resize); ro.observe(box);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '100px' });
  io.observe(box);
  resize();

  const setProgress = (p) => {
    const v = Math.max(0, Math.min(100, Math.floor(p * 100)));
    if (pct) pct.textContent = v;
    if (arc) arc.style.strokeDashoffset = String(100 - v);
  };

  const mouse = { x: 0, y: 0, moved: false, on: 0 };
  const onMove = (cx, cy) => {
    rect = box.getBoundingClientRect();
    mouse.x = camera.left + ((cx - rect.left) / rect.width) * (camera.right - camera.left);
    mouse.y = camera.top - (cy - rect.top) / cssPerUnit;
    mouse.moved = true;
  };
  const pm = (e) => onMove(e.clientX, e.clientY);
  const tm = (e) => { const t = e.touches[0]; if (t) onMove(t.clientX, t.clientY); };
  window.addEventListener('pointermove', pm, { passive: true });
  window.addEventListener('touchmove', tm, { passive: true });

  let data = null;
  const st = { phase: 'loading', t0: 0, yaw: 0, pitch: 0, band: 5, p: 0, target: 0 };
  const BAND_TOP = 1.08, BAND_BOT = -1.4;

  // Scroll-linked reveal: scrolling down sweeps the band and opens the photo; scrolling up returns to dots.
  // Reveal starts once the portrait's top reaches min(its resting position, 30% of the screen),
  // and completes after another half screen of scrolling.
  let startTop = null;
  const readScroll = () => {
    const r = box.getBoundingClientRect();
    const vh = window.innerHeight;
    if (startTop === null) startTop = r.top + window.scrollY;     // position on the page
    const start = Math.min(startTop, vh * 0.5);                   // viewport y where the reveal begins
    const t = Math.max(0, Math.min(1, (start - r.top) / (vh * 0.17)));
    st.target = t > 0.97 ? 1 : t;
  };
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', () => { startTop = null; readScroll(); });
  readScroll();

  function build(dotsBuf, bmp) {
    const dv = new DataView(dotsBuf);
    const N = dv.getUint32(4, true);
    const pos = new Float32Array(N * 3), nor = new Float32Array(N * 3), ring = new Float32Array(N * 3);
    const rnd = new Float32Array(N), bri = new Float32Array(N), cls = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const b = 8 + i * 12;
      pos[i * 3] = dv.getInt16(b, true) / 8192; pos[i * 3 + 1] = dv.getInt16(b + 2, true) / 8192; pos[i * 3 + 2] = dv.getInt16(b + 4, true) / 8192;
      nor[i * 3] = dv.getInt8(b + 6) / 127; nor[i * 3 + 1] = dv.getInt8(b + 7) / 127; nor[i * 3 + 2] = dv.getInt8(b + 8) / 127;
      rnd[i] = dv.getUint8(b + 9) / 255; bri[i] = dv.getUint8(b + 10) / 180; cls[i] = dv.getUint8(b + 11);
    }
    // loader ring: centre of the box, radius matches the CSS ring
    const R = 0.36;
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2 * 37.0 + rnd[i] * 0.3;
      const rr = R * (1 + (Math.random() - 0.5) * 0.06);
      ring[i * 3] = Math.cos(ang) * rr; ring[i * 3 + 1] = Math.sin(ang) * rr;
    }
    const tex = new THREE.Texture(bmp);
    tex.flipY = false; tex.colorSpace = THREE.NoColorSpace;
    tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.needsUpdate = true;

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aNormal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
    g.setAttribute('aBright', new THREE.BufferAttribute(bri, 1));
    g.setAttribute('aCls', new THREE.BufferAttribute(cls, 1));
    g.setAttribute('aRing', new THREE.BufferAttribute(ring, 3));
    dotsMat = new THREE.ShaderMaterial({
      vertexShader: dotsVert, fragmentShader: dotsFrag, ...ADD,
      uniforms: {
        uIntro: { value: 0 }, uYaw: { value: 0 }, uPitch: { value: 0 },
        uNeckY: { value: meta.neckY }, uChestY: { value: meta.chestY }, uPivot: { value: new THREE.Vector3(...meta.pivot) },
        uMouse: { value: new THREE.Vector2() }, uMouseOn: { value: 0 }, uSweep: { value: 5 }, uSweepOn: { value: 0 },
        uBand: { value: 5 }, uRevealOn: { value: 0 }, uPhotoHalf: { value: new THREE.Vector2(ASPECT, 1) },
        uPhoto: { value: tex }, uColor: { value: CRIMSON }, uPx: { value: pxPerUnit }, uSpacing: { value: new THREE.Vector3(...meta.spacing) },
      },
    });
    const dots = new THREE.Points(g, dotsMat); dots.frustumCulled = false; dots.renderOrder = 2;

    photoMat = new THREE.ShaderMaterial({
      vertexShader: photoVert, fragmentShader: photoFrag, transparent: true, depthTest: false, depthWrite: false,
      blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
      uniforms: { uPhoto: { value: tex }, uBand: { value: 5 }, uRevealOn: { value: 0 }, uDim: { value: 0 }, uCell: { value: 0.022 } },
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2 * ASPECT, 2), photoMat);
    plane.position.z = -1; plane.renderOrder = 1;

    const DN = 420, dp = new Float32Array(DN * 3), dr = new Float32Array(DN);
    for (let i = 0; i < DN; i++) {
      dp[i * 3] = (Math.random() * 2 - 1) * ASPECT * 1.05; dp[i * 3 + 1] = Math.random() * 2.2 - 1.1; dp[i * 3 + 2] = Math.random() - 0.3; dr[i] = Math.random();
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3)); dg.setAttribute('aRand', new THREE.BufferAttribute(dr, 1));
    dustMat = new THREE.ShaderMaterial({ vertexShader: dustVert, fragmentShader: dustFrag, ...ADD, uniforms: { uTime: { value: 0 }, uPx: { value: pxPerUnit }, uFade: { value: 0 } } });
    const dust = new THREE.Points(dg, dustMat); dust.frustumCulled = false; dust.renderOrder = 3;
    scene.add(plane, dots, dust);
  }

  function bandToBanner() {
    if (!bannerHot || !bannerEl) return;
    if (st.band > 4) { bannerHot.style.clipPath = 'inset(0 0 100% 0)'; return; }
    const r = box.getBoundingClientRect();
    const yScreen = r.top + (camera.top - st.band) * cssPerUnit;
    const b = bannerEl.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (yScreen - b.top) / Math.max(1, b.height)));
    bannerHot.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;
  }

  let last = performance.now();
  function frame(now) {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible) return;
    const t = now / 1000, U = dotsMat.uniforms;
    dustMat.uniforms.uTime.value = t;

    if (st.phase === 'intro') {
      const k = Math.min(1, (now - st.t0) / (reduce ? 1 : 2400));
      U.uIntro.value = k; photoMat.uniforms.uDim.value = 0.0; dustMat.uniforms.uFade.value = k;
      if (k >= 1) { st.phase = 'sweep'; st.t0 = now; }
    }
    if (st.phase === 'sweep') {
      const k = Math.min(1, (now - st.t0) / 1700);
      U.uSweepOn.value = 1; U.uSweep.value = BAND_TOP + (-1.05 - BAND_TOP) * ease(k);
      if (k >= 1) { U.uSweepOn.value = 0; st.phase = 'live'; }
    }

    // reveal progress follows the scroll position, smoothed
    if (st.phase === 'live') { st.p += (st.target - st.p) * (1 - Math.exp(-dt * 12)); if (Math.abs(st.target - st.p) < 0.002) st.p = st.target; }
    const p = st.p;
    const follow = 1 - Math.min(1, p / 0.12);          // face forward as the reveal begins
    let ty = 0, tp = 0;
    if (follow > 0 && st.phase !== 'loading') {
      if (!mouse.moved) { ty = Math.sin(t * 0.35) * 0.1; tp = Math.sin(t * 0.27) * 0.035; }
      else {
        ty = THREE.MathUtils.clamp((mouse.x - meta.pivot[0]) / 0.9, -1, 1) * MAX_YAW;
        tp = -THREE.MathUtils.clamp((mouse.y - (meta.pivot[1] + 0.25)) / 0.8, -1, 1) * MAX_PITCH;
      }
    }
    ty *= follow; tp *= follow;
    const sm = 1 - Math.exp(-dt * (follow < 1 ? 6 : 2.6));
    st.yaw += (ty - st.yaw) * sm; st.pitch += (tp - st.pitch) * sm;
    U.uYaw.value = st.yaw; U.uPitch.value = st.pitch;

    const lightOn = mouse.moved && (st.phase === 'live' || st.phase === 'sweep') ? follow : 0;
    mouse.on += (lightOn - mouse.on) * (1 - Math.exp(-dt * 4));
    U.uMouseOn.value = mouse.on; U.uMouse.value.set(mouse.x, mouse.y);

    if (st.phase === 'live') {
      st.band = p > 0.001 ? BAND_TOP + (BAND_BOT - BAND_TOP) * p - 0.02 : 5;
      const on = p > 0.001 ? 1 : 0;
      U.uRevealOn.value = on; photoMat.uniforms.uRevealOn.value = on;
      U.uSweepOn.value = p > 0.001 && p < 0.999 ? 0.7 : 0; U.uSweep.value = st.band;
      dustMat.uniforms.uFade.value = 1 - p * 0.85;
      box.classList.toggle('dh-revealed', p > 0.995);
      if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 4));
    }
    U.uBand.value = st.band; photoMat.uniforms.uBand.value = st.band;
    bandToBanner();
    renderer.render(scene, camera);
    if (!st.checked && st.phase !== 'loading' && now - st.started > 1200) {
      st.checked = true;
      if (!pixelsVisible()) { switchTo2D(); return; }
    }
  }

  function pixelsVisible() {
    try {
      const gl = renderer.getContext();
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const n = 48, px = new Uint8Array(n * n * 4);
      let sum = 0;
      for (const [fx, fy] of [[0.5, 0.5], [0.5, 0.72], [0.35, 0.4]]) {
        gl.readPixels(Math.max(0, Math.floor(w * fx - n / 2)), Math.max(0, Math.floor(h * fy - n / 2)), n, n, gl.RGBA, gl.UNSIGNED_BYTE, px);
        for (let i = 0; i < px.length; i += 4) sum += px[i] + px[i + 3];
      }
      return sum > 0;
    } catch (e) {
      return true; // can't check -> assume fine
    }
  }

  function switchTo2D() {
    cancelAnimationFrame(raf);
    try { renderer.dispose(); } catch (e) {}
    canvas.style.display = 'none';
    start2D();
  }

  async function start2D() {
    try {
      const { buf, photoBlob } = data;
      const img = await createImageBitmap(photoBlob);
      const dv = new DataView(buf), N = dv.getUint32(4, true);
      // photo luminance under each dot
      const SW = 240, SH = Math.round(SW / ASPECT);
      const oc = document.createElement('canvas'); oc.width = SW; oc.height = SH;
      const octx = oc.getContext('2d'); octx.drawImage(img, 0, 0, SW, SH);
      const pix = octx.getImageData(0, 0, SW, SH).data;
      const X = new Float32Array(N), Y = new Float32Array(N), D = new Float32Array(N), R = new Float32Array(N), C = new Uint8Array(N);
      const sp = meta.spacing; // head, body, background (world units)
      for (let i = 0; i < N; i++) {
        const b = 8 + i * 12;
        X[i] = dv.getInt16(b, true) / 8192; Y[i] = dv.getInt16(b + 2, true) / 8192;
        R[i] = dv.getUint8(b + 9) / 255; C[i] = dv.getUint8(b + 11);
        const u = Math.min(SW - 1, Math.max(0, Math.floor((X[i] / (2 * ASPECT) + 0.5) * SW)));
        const v = Math.min(SH - 1, Math.max(0, Math.floor((0.5 - Y[i] / 2) * SH)));
        const k = (v * SW + u) * 4;
        const lum = (0.299 * pix[k] + 0.587 * pix[k + 1] + 0.114 * pix[k + 2]) / 255;
        const tone = C[i] > 0 ? Math.min(1, lum * 1.1 + 0.08) : lum * 0.72;
        const s = C[i] === 2 ? sp[0] : C[i] === 1 ? sp[1] : sp[2];
        D[i] = s * (0.24 + 0.86 * Math.pow(Math.max(tone, 0), 0.6));
      }
      const c2 = document.createElement('canvas');
      c2.className = 'absolute inset-0 h-full w-full';
      c2.setAttribute('aria-hidden', 'true');
      box.insertBefore(c2, canvas.nextSibling);
      const ctx = c2.getContext('2d');
      let dirty = true;
      const markDirty = () => { dirty = true; };
      window.addEventListener('scroll', markDirty, { passive: true });
      window.addEventListener('pointermove', markDirty, { passive: true });
      const t0 = performance.now();
      const draw = (now) => {
        if (disposed) return;
        raf = requestAnimationFrame(draw);
        const intro = Math.min(1, (now - t0) / (reduce ? 1 : 1600));
        st.p += (st.target - st.p) * 0.2; if (Math.abs(st.target - st.p) < 0.002) st.p = st.target;
        if (!dirty && intro >= 1 && Math.abs(st.target - st.p) < 0.001) return;
        dirty = false;
        const r = box.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
        if (c2.width !== W || c2.height !== H) { c2.width = W; c2.height = H; }
        const ppu = H / (camera.top - camera.bottom);   // pixels per world unit (same view as the 3D camera)
        const toX = (x) => (x - camera.left) * ppu, toY = (y) => (camera.top - y) * ppu;
        const p = st.p;
        const band = p > 0.001 ? BAND_TOP + (BAND_BOT - BAND_TOP) * p - 0.02 : 5;
        st.band = band;
        ctx.clearRect(0, 0, W, H);
        // revealed part: the real photo above the band
        if (band < 4) {
          const by = Math.max(0, Math.min(H, toY(band)));
          ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, by); ctx.clip();
          ctx.drawImage(img, toX(-ASPECT), toY(1), 2 * ASPECT * ppu, 2 * ppu);
          ctx.restore();
          ctx.fillStyle = 'rgba(255,40,50,0.9)'; ctx.fillRect(0, by - 1 * dpr, W, 2 * dpr);
        }
        // cursor light: dots near the pointer grow a little
        const mx = mouse.moved ? toX(mouse.x) : -1e4, my = mouse.moved ? toY(mouse.y) : -1e4;
        for (const [cls, col] of [[0, 'rgb(150,10,16)'], [1, 'rgb(255,26,38)']]) {
          ctx.fillStyle = col; ctx.beginPath();
          for (let i = 0; i < N; i++) {
            if ((C[i] > 0 ? 1 : 0) !== cls || Y[i] > band) continue;
            const k = Math.max(0, Math.min(1, intro * 1.5 - R[i] * 0.5));
            if (k <= 0) continue;
            const x = toX(X[i]), y = toY(Y[i]);
            const dx = x - mx, dy = y - my;
            const glow = 1 + 0.5 * Math.exp(-(dx * dx + dy * dy) / (2 * (ppu * 0.18) ** 2));
            const rad = (D[i] * ppu * 0.5) * k * glow;
            if (rad < 0.3) continue;
            ctx.moveTo(x + rad, y); ctx.arc(x, y, rad, 0, Math.PI * 2);
          }
          ctx.fill();
        }
        if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 4));
        box.classList.toggle('dh-revealed', p > 0.995);
        bandToBanner();
      };
      box.classList.add('dh-2d');
      raf = requestAnimationFrame(draw);
    } catch (e) {
      fallback();
    }
  }

  (async () => {
    try {
      const blobs = o.src.embedded ? await decodeEmbedded(o.src.embedded, setProgress) : await fetchWithProgress(o.src.urls, setProgress);
      if (disposed) return;
      const buf = await blobs[0].arrayBuffer();
      data = { buf, photoBlob: blobs[1] };
      const bmp = await createImageBitmap(blobs[1], { imageOrientation: 'flipY', premultiplyAlpha: 'none' });
      if (disposed) return;
      build(buf, bmp); resize();
      loader && loader.classList.add('done');
      box.classList.add('dh-ready');
      clearTimeout(watchdog);
      st.phase = 'intro'; st.t0 = performance.now(); st.started = performance.now();
      if (window.__DH_FORCE_2D__) { switchTo2D(); return; }
      raf = requestAnimationFrame(frame);
    } catch (e) {
      fallback();
    }
  })();

  return {
    destroy() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', pm); window.removeEventListener('touchmove', tm);
      window.removeEventListener('scroll', readScroll); clearTimeout(watchdog);
      renderer.dispose();
    },
  };
}
