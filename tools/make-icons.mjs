/* 生成 PWA 图标 PNG（无需任何依赖）：node tools/make-icons.mjs */
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(CRC(body));
  return Buffer.concat([len, body, crc]);
}

function png(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function lerp(a, b, t) { return a + (b - a) * t; }
function cov(d, soft) { return Math.max(0, Math.min(1, 1 - d / soft)); }

function draw(S) {
  const buf = Buffer.alloc(S * S * 4);
  const cx = S / 2, cy = S / 2;
  const R = S * 0.258, W = S * 0.066;
  const corner = S * 0.22;
  const dotR = S * 0.102;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      /* 圆角矩形遮罩 */
      const dx = Math.max(corner - x, x - (S - corner), 0);
      const dy = Math.max(corner - y, y - (S - corner), 0);
      const distRect = Math.hypot(dx, dy);
      const aBg = cov(Math.max(0, distRect - corner + 1.5), 2);
      /* 渐变底色 #4f7cff -> #7b5cff */
      const t = (x / S + y / S) / 2;
      let r = lerp(0x4f, 0x7b, t), g = lerp(0x7c, 0x5c, t), b = lerp(0xff, 0xff, t);
      let alpha = aBg;
      /* 白环（缺口 90°） */
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const ringA = cov(Math.abs(d - R) - W / 2, 1.6);
      const ang = Math.atan2(y + 0.5 - cy, x + 0.5 - cx);
      const deg = (ang * 180 / Math.PI + 450) % 360; /* 0 在正上方，顺时针 */
      const inArc = deg < 300 ? 1 : cov(deg - 300, 1.2) * 0;
      const ring = ringA * inArc;
      /* 圆点 */
      const dot = cov(Math.hypot(x + 0.5 - cx - R * Math.sin(300 * Math.PI / 180), y + 0.5 - cy + R * Math.cos(300 * Math.PI / 180)) - dotR, 1.6);
      r = lerp(r, 255, Math.min(1, ring + dot));
      g = lerp(g, 255, Math.min(1, ring + dot));
      b = lerp(b, 255, Math.min(1, ring + dot));
      /* 中心白色圆盘 + 数字 4 的镂空（用简单笔画拼出 4） */
      const dc = cov(d - dotR * 0.92, 1.6);
      r = lerp(r, 255, dc); g = lerp(g, 255, dc); b = lerp(b, 255, dc);
      const sx = (x + 0.5 - cx) / S, sy = (y + 0.5 - cy) / S;
      const sw = 0.026;                                                                   /* 笔画宽度（相对边长） */
      const diagX = -0.105 + (sy + 0.105) / 0.115 * 0.085;                                /* 从左上斜到横画 */
      const inFour =
        (sy > -0.108 && sy < 0.012 && Math.abs(sx - diagX) < sw / 2) ||                   /* 斜画 */
        (Math.abs(sy - 0.012) < sw / 2 && sx > -0.088 && sx < 0.086) ||                   /* 横画 */
        (Math.abs(sx - 0.026) < sw / 2 && sy > -0.112 && sy < 0.088);                     /* 竖画 */
      if (inFour) { r = 0x4f; g = 0x6c; b = 0xf0; }
      buf[i] = Math.round(r); buf[i + 1] = Math.round(g); buf[i + 2] = Math.round(b);
      buf[i + 3] = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
    }
  }
  return buf;
}

const out = path.join(process.cwd(), 'assets', 'icons');
fs.mkdirSync(out, { recursive: true });
for (const size of [192, 512]) {
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size, size, draw(size)));
  console.log('written icon-' + size + '.png');
}
