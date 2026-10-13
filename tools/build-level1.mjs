// Seviye 1 "Köpüklü Küvet" sahnesini üretir.
// Tek kaynaktan iki SVG çıkar: line.svg (siyah-beyaz) ve color.svg (renkli),
// ve ördek konumlarını levels/levels.json içine yazar.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1536;
const H = 2048;
const STROKE = 5;

const C = {
  wall: '#CFE8F3',
  tileLine: '#000',
  floor: '#F4F1EA',
  sky: '#8EC3E6',
  frame: '#F4F1EA',
  pink: '#E8B4B8',
  green: '#9BC59D',
  purple: '#B9A6D9',
  tub: '#FFFFFF',
  water: '#8EC3E6',
  foam: '#FFFFFF',
  metal: '#B9C3CC',
  duck: '#FFD23F',
  beak: '#FF8C42',
  golden: '#F2B705',
  pot: '#E8B4B8',
  soap: '#B9A6D9',
};

// Ördekler: x, y = merkez (sahne pikseli), s = ölçek. r dokunma yarıçapı olarak hesaplanır.
const DUCKS = [
  { id: 1, x: 640, y: 1120, s: 1.15, pose: 'side', flip: false }, // suda yüzüyor (açıkta)
  { id: 2, x: 1185, y: 592, s: 0.7, pose: 'side', flip: true }, // rafta şişelerin arasında
  { id: 3, x: 640, y: 1745, s: 0.95, pose: 'side', flip: true }, // paspasın üstünde
  { id: 4, x: 1060, y: 1135, s: 0.85, pose: 'head', flip: true }, // köpükten kafası çıkmış
  { id: 5, x: 470, y: 512, s: 0.75, pose: 'side', flip: false }, // pencere pervazında
];
const GOLDEN = { x: 1262, y: 1610, s: 0.42, flip: true }; // saksıdaki yaprakların arasında

function duck({ x, y, s, flip }, mode, fill = C.duck) {
  const f = (c) => (mode === 'color' ? c : '#FFFFFF');
  const sx = flip ? -s : s;
  return `
  <g transform="translate(${x} ${y}) scale(${sx} ${s})" stroke="#000" stroke-width="${STROKE / s}" stroke-linejoin="round" stroke-linecap="round">
    <path d="M -78 -28 Q -60 -5 -40 -10 L 15 -12 Q 70 -15 72 25 Q 70 62 0 62 Q -60 62 -72 30 Q -80 5 -78 -28 Z" fill="${f(fill)}"/>
    <path d="M -30 12 Q 0 38 32 10" fill="none"/>
    <circle cx="35" cy="-45" r="34" fill="${f(fill)}"/>
    <path d="M 64 -52 Q 94 -50 98 -39 Q 90 -28 64 -31 Z" fill="${f(C.beak)}"/>
    <circle cx="45" cy="-53" r="5.5" fill="#000" stroke="none"/>
  </g>`;
}

function bubbles(list, mode) {
  const f = (c) => (mode === 'color' ? c : '#FFFFFF');
  return list
    .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f(C.foam)}"/>`)
    .join('');
}

function scene(mode) {
  const f = (c) => (mode === 'color' ? c : '#FFFFFF');
  const tiles = [];
  for (let x = 192; x < W; x += 192) tiles.push(`<line x1="${x}" y1="0" x2="${x}" y2="1300" stroke-width="3"/>`);
  for (let y = 192; y < 1300; y += 192) tiles.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke-width="3"/>`);
  const floorLines = [];
  for (let x = -400; x < W + 400; x += 256) floorLines.push(`<line x1="${W / 2 + (x - W / 2) * 0.55}" y1="1300" x2="${x}" y2="${H}" stroke-width="3"/>`);
  floorLines.push(`<line x1="0" y1="1560" x2="${W}" y2="1560" stroke-width="3"/>`, `<line x1="0" y1="1870" x2="${W}" y2="1870" stroke-width="3"/>`);

  // Küvetin önündeki köpük; 4. ördeğin alt yarısını kapatır.
  const foamFront = bubbles(
    [
      [360, 1180, 38], [420, 1170, 46], [490, 1185, 34], [800, 1178, 40], [860, 1168, 48],
      [930, 1182, 36], [990, 1175, 44], [1050, 1170, 52], [1110, 1172, 46], [1170, 1180, 40],
      [1230, 1176, 34], [1290, 1184, 30],
    ],
    mode,
  );
  const foamBack = bubbles([[540, 1150, 30], [760, 1148, 28], [1010, 1140, 30], [1140, 1138, 34]], mode);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <g stroke="#000" stroke-width="${STROKE}" stroke-linejoin="round" stroke-linecap="round">
    <!-- duvar ve fayanslar -->
    <rect x="0" y="0" width="${W}" height="1300" fill="${f(C.wall)}" stroke="none"/>
    ${tiles.join('')}
    <!-- zemin -->
    <rect x="0" y="1300" width="${W}" height="${H - 1300}" fill="${f(C.floor)}"/>
    ${floorLines.join('')}

    <!-- pencere -->
    <rect x="130" y="150" width="440" height="370" rx="18" fill="${f(C.frame)}"/>
    <rect x="160" y="180" width="380" height="310" rx="8" fill="${f(C.sky)}"/>
    <path d="M 210 300 Q 240 260 280 290 Q 320 260 350 300 Z" fill="${f('#FFFFFF')}"/>
    <path d="M 400 400 Q 425 370 455 392 Q 485 372 505 404 Z" fill="${f('#FFFFFF')}"/>
    <line x1="350" y1="180" x2="350" y2="490"/>
    <line x1="160" y1="335" x2="540" y2="335"/>
    <rect x="100" y="545" width="500" height="34" rx="8" fill="${f(C.frame)}"/>
    <!-- pervazdaki küçük kaktüs -->
    <rect x="200" y="500" width="54" height="46" rx="6" fill="${f(C.pot)}"/>
    <path d="M 214 500 Q 212 440 227 432 Q 242 440 240 500" fill="${f(C.green)}"/>

    <!-- raf ve şişeler -->
    <rect x="940" y="640" width="480" height="26" rx="6" fill="${f(C.frame)}"/>
    <path d="M 960 666 L 990 720 M 1400 666 L 1370 720"/>
    <rect x="975" y="520" width="80" height="120" rx="18" fill="${f(C.pink)}"/>
    <rect x="997" y="492" width="36" height="30" rx="6" fill="${f(C.purple)}"/>
    <rect x="1075" y="555" width="62" height="85" rx="14" fill="${f(C.green)}"/>
    <rect x="1265" y="500" width="70" height="140" rx="20" fill="${f(C.purple)}"/>
    <rect x="1285" y="470" width="30" height="32" rx="6" fill="${f(C.pink)}"/>
    <circle cx="1375" cy="615" r="25" fill="${f(C.pink)}"/>

    <!-- havlu askısı ve havlu -->
    <line x1="1080" y1="760" x2="1440" y2="760"/>
    <circle cx="1080" cy="760" r="12" fill="${f(C.metal)}"/>
    <circle cx="1440" cy="760" r="12" fill="${f(C.metal)}"/>
    <path d="M 1130 750 L 1390 750 L 1380 950 Q 1260 970 1140 950 Z" fill="${f(C.pink)}"/>
    <line x1="1135" y1="860" x2="1385" y2="860"/>
    <line x1="1136" y1="890" x2="1384" y2="890"/>

    <!-- ayna -->
    <rect x="720" y="230" width="230" height="300" rx="115" fill="${f('#E9F5FB')}"/>
    <path d="M 770 300 L 820 260 M 780 350 L 860 285"/>

    <!-- musluk -->
    <path d="M 1300 1110 L 1300 1040 Q 1300 1000 1250 1000 L 1220 1000 L 1220 1030 L 1260 1030 Q 1270 1030 1270 1045 L 1270 1110 Z" fill="${f(C.metal)}"/>
    <circle cx="1330" cy="1060" r="16" fill="${f(C.metal)}"/>

    <!-- küvet arkası, su ve arka köpük -->
    <path d="M 280 1110 L 1380 1110 L 1380 1150 L 280 1150 Z" fill="${f(C.tub)}"/>
    <rect x="300" y="1120" width="1060" height="40" fill="${f(C.water)}"/>
    ${foamBack}
  </g>

  ${duck(DUCKS[0], mode)}
  ${duck(DUCKS[3], mode)}

  <g stroke="#000" stroke-width="${STROKE}" stroke-linejoin="round" stroke-linecap="round">
    ${foamFront}
    <!-- küvet gövdesi -->
    <path d="M 260 1190 L 1400 1190 Q 1400 1480 1200 1540 L 500 1540 Q 280 1480 260 1190 Z" fill="${f(C.tub)}"/>
    <rect x="240" y="1170" width="1180" height="44" rx="22" fill="${f(C.tub)}"/>
    <path d="M 450 1530 L 420 1610 L 480 1610 L 500 1540 M 1250 1530 L 1280 1610 L 1220 1610 L 1200 1540" fill="${f(C.metal)}"/>
    <path d="M 340 1270 Q 360 1400 470 1460" fill="none"/>
    <!-- sabunluk ve sabun -->
    <rect x="320" y="1150" width="120" height="26" rx="10" fill="${f(C.metal)}"/>
    <ellipse cx="380" cy="1140" rx="46" ry="18" fill="${f(C.soap)}"/>

    <!-- paspas -->
    <rect x="360" y="1690" width="560" height="200" rx="60" fill="${f(C.green)}"/>
    <rect x="390" y="1715" width="500" height="150" rx="45" fill="none" stroke-dasharray="14 14" stroke-width="4"/>

    <!-- terlikler -->
    <ellipse cx="1000" cy="1930" rx="60" ry="30" fill="${f(C.purple)}"/>
    <ellipse cx="1110" cy="1950" rx="60" ry="30" fill="${f(C.purple)}"/>

    <!-- saksı bitkisi: arka yapraklar -->
    <path d="M 1290 1700 Q 1170 1590 1180 1480 Q 1260 1560 1300 1690 Z" fill="${f(C.green)}"/>
    <path d="M 1310 1700 Q 1340 1520 1400 1440 Q 1420 1580 1330 1700 Z" fill="${f(C.green)}"/>
  </g>

  ${duck(GOLDEN, mode, C.golden)}
  ${duck(DUCKS[2], mode)}
  ${duck(DUCKS[1], mode)}
  ${duck(DUCKS[4], mode)}

  <g stroke="#000" stroke-width="${STROKE}" stroke-linejoin="round" stroke-linecap="round">
    <!-- saksı bitkisi: ön yaprak altın ördeğin bir kısmını kapatır -->
    <path d="M 1300 1700 Q 1200 1660 1150 1600 Q 1250 1600 1310 1690 Z" fill="${f(C.green)}"/>
    <path d="M 1320 1700 Q 1440 1640 1470 1560 Q 1380 1580 1320 1690 Z" fill="${f(C.green)}"/>
    <path d="M 1230 1690 L 1400 1690 L 1380 1840 L 1250 1840 Z" fill="${f(C.pot)}"/>
    <rect x="1215" y="1675" width="200" height="34" rx="10" fill="${f(C.pot)}"/>
  </g>
</svg>
`;
}

const outDir = join(root, 'art/world-1/level-01');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'line.svg'), scene('line'));
writeFileSync(join(outDir, 'color.svg'), scene('color'));

const levelsPath = join(root, 'levels/levels.json');
const data = JSON.parse(readFileSync(levelsPath, 'utf8'));
const level = data.levels.find((l) => l.id === 'w1-l01');
level.line = 'art/world-1/level-01/line.svg';
level.color = 'art/world-1/level-01/color.svg';
// Kafa pozunda görünen kısım üstte; dokunma merkezi kafaya kaydırılır.
level.ducks = DUCKS.map(({ id, x, y, s, pose, flip }) => ({
  id,
  x: pose === 'head' ? Math.round(x + (flip ? -35 : 35) * s) : x,
  y: pose === 'head' ? Math.round(y - 40 * s) : y,
  r: Math.round((pose === 'head' ? 55 : 80) * s),
  pose,
}));
level.golden = { x: Math.round(GOLDEN.x - 35 * GOLDEN.s), y: Math.round(GOLDEN.y - 30 * GOLDEN.s), r: Math.round(80 * GOLDEN.s) };
writeFileSync(levelsPath, JSON.stringify(data, null, 2) + '\n');
console.log('Seviye 1 üretildi:', outDir);
