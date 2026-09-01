/**
 * Régénère src/app/font-display.css à partir du TTF de public/fonts/.
 *
 *   node scripts/build-font-css.js
 *
 * Trois étapes, sans aucune dépendance (zlib suffit) :
 *
 *   1. Rustine de cmap. Revista ne contient que 59 caractères : ni accents, ni
 *      ponctuation. Sans correctif, « Compétences » ou « Résultats » afficheraient
 *      un « é » système au milieu des blocs tamponnés. On remappe donc chaque
 *      lettre accentuée vers sa lettre de base (É -> E, ô -> o…). L'accent est
 *      perdu, mais le titre reste dans la police. Les caractères sans équivalent
 *      (apostrophe, &, chiffres 5-9) restent absents : voir MANQUANTS ci-dessous.
 *
 *   2. TTF -> WOFF : réemballe les tables dans le conteneur web standard.
 *      Utile pour les vieux TTF que le sanitiseur de police des navigateurs peut
 *      refuser, et ~40 % plus léger.
 *
 *   3. WOFF -> data URI base64 inséré dans une règle @font-face. La police voyage
 *      dans le CSS : ni 404, ni type MIME, ni cache, ni CORS ne peuvent la bloquer.
 *
 * Pour changer de police : remplace SRC et FAMILY, puis relance le script.
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public/fonts/REVISTA.ttf");
const WOFF = path.join(ROOT, "public/fonts/revista.woff");
const CSS = path.join(ROOT, "src/app/font-display.css");
const FAMILY = "Revista";

/* Lettre accentuée -> lettre de base à réutiliser. */
const FOLD = {
  "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A",
  "Ç": "C",
  "È": "E", "É": "E", "Ê": "E", "Ë": "E",
  "Ì": "I", "Í": "I", "Î": "I", "Ï": "I",
  "Ñ": "N",
  "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O",
  "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U",
  "Ý": "Y", "Ÿ": "Y",
  "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a",
  "ç": "c",
  "è": "e", "é": "e", "ê": "e", "ë": "e",
  "ì": "i", "í": "i", "î": "i", "ï": "i",
  "ñ": "n",
  "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o",
  "ù": "u", "ú": "u", "û": "u", "ü": "u",
  "ý": "y", "ÿ": "y",
  "Œ": "O", "œ": "o", "Æ": "A", "æ": "a",
};

const pad4 = (n) => (n + 3) & ~3;

/* ---------- lecture du sfnt ---------- */
function readTables(buf) {
  const num = buf.readUInt16BE(4);
  const tables = [];
  for (let i = 0; i < num; i++) {
    const o = 12 + i * 16;
    tables.push({
      tag: buf.toString("ascii", o, o + 4),
      data: buf.subarray(buf.readUInt32BE(o + 8), buf.readUInt32BE(o + 8) + buf.readUInt32BE(o + 12)),
    });
  }
  return tables;
}

/* ---------- cmap format 4 : lecture ---------- */
function readCmap(cmap) {
  const n = cmap.readUInt16BE(2);
  let sub = -1;
  for (let i = 0; i < n; i++) {
    const r = 4 + i * 8;
    const pid = cmap.readUInt16BE(r);
    const eid = cmap.readUInt16BE(r + 2);
    if (pid === 3 && (eid === 1 || eid === 10)) sub = cmap.readUInt32BE(r + 4);
  }
  if (sub < 0) throw new Error("Pas de sous-table cmap (3,1) : police non gérée.");
  if (cmap.readUInt16BE(sub) !== 4) throw new Error("Sous-table cmap non format 4 : police non gérée.");

  const segX2 = cmap.readUInt16BE(sub + 6);
  const seg = segX2 / 2;
  const map = new Map();
  for (let s = 0; s < seg; s++) {
    const end = cmap.readUInt16BE(sub + 14 + s * 2);
    const start = cmap.readUInt16BE(sub + 16 + segX2 + s * 2);
    const delta = cmap.readInt16BE(sub + 16 + segX2 * 2 + s * 2);
    const roOff = sub + 16 + segX2 * 3 + s * 2;
    const ro = cmap.readUInt16BE(roOff);
    if (start === 0xffff) continue;
    for (let c = start; c <= end; c++) {
      let g;
      if (ro === 0) g = (c + delta) & 0xffff;
      else {
        const gi = cmap.readUInt16BE(roOff + ro + (c - start) * 2);
        g = gi ? (gi + delta) & 0xffff : 0;
      }
      if (g) map.set(c, g);
    }
  }
  return map;
}

/* ---------- cmap format 4 : écriture ----------
   Un segment par caractère (idRangeOffset = 0). Plus volumineux qu'un encodage
   par plages, mais toujours correct, y compris pour nos remappages arbitraires. */
function writeCmap(map) {
  const codes = [...map.keys()].sort((a, b) => a - b);
  const segCount = codes.length + 1; // + le segment terminateur 0xFFFF
  const len = 16 + 8 * segCount;
  const sub = Buffer.alloc(len);

  const entrySelector = Math.floor(Math.log2(segCount));
  sub.writeUInt16BE(4, 0);
  sub.writeUInt16BE(len, 2);
  sub.writeUInt16BE(0, 4); // language
  sub.writeUInt16BE(segCount * 2, 6);
  sub.writeUInt16BE(2 * 2 ** entrySelector, 8);
  sub.writeUInt16BE(entrySelector, 10);
  sub.writeUInt16BE(segCount * 2 - 2 * 2 ** entrySelector, 12);

  const endAt = 14;
  const startAt = endAt + segCount * 2 + 2;
  const deltaAt = startAt + segCount * 2;
  const roAt = deltaAt + segCount * 2;

  codes.forEach((c, i) => {
    sub.writeUInt16BE(c, endAt + i * 2);
    sub.writeUInt16BE(c, startAt + i * 2);
    sub.writeUInt16BE((map.get(c) - c) & 0xffff, deltaAt + i * 2);
    sub.writeUInt16BE(0, roAt + i * 2);
  });
  const t = codes.length;
  sub.writeUInt16BE(0xffff, endAt + t * 2);
  sub.writeUInt16BE(0xffff, startAt + t * 2);
  sub.writeUInt16BE(1, deltaAt + t * 2);
  sub.writeUInt16BE(0, roAt + t * 2);

  const header = Buffer.alloc(12);
  header.writeUInt16BE(0, 0); // version
  header.writeUInt16BE(1, 2); // numTables
  header.writeUInt16BE(3, 4); // platformID Windows
  header.writeUInt16BE(1, 6); // encodingID BMP
  header.writeUInt32BE(12, 8);
  return Buffer.concat([header, sub]);
}

/* ---------- reconstruction du sfnt, checksums recalculés ---------- */
function checksum(buf) {
  let sum = 0;
  const end = pad4(buf.length);
  for (let i = 0; i < end; i += 4) {
    let v = 0;
    for (let j = 0; j < 4; j++) v = v * 256 + (i + j < buf.length ? buf[i + j] : 0);
    sum = (sum + v) >>> 0;
  }
  return sum >>> 0;
}

function buildSfnt(tables) {
  tables.sort((a, b) => (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
  const n = tables.length;
  const entrySelector = Math.floor(Math.log2(n));

  const header = Buffer.alloc(12);
  header.writeUInt32BE(0x00010000, 0);
  header.writeUInt16BE(n, 4);
  header.writeUInt16BE(16 * 2 ** entrySelector, 6);
  header.writeUInt16BE(entrySelector, 8);
  header.writeUInt16BE(n * 16 - 16 * 2 ** entrySelector, 10);

  const dir = Buffer.alloc(16 * n);
  const blobs = [];
  let offset = 12 + 16 * n;

  tables.forEach((t, i) => {
    const o = i * 16;
    dir.write(t.tag, o, "ascii");
    // Le checksum de head se calcule avec checksumAdjustment à zéro.
    let forSum = t.data;
    if (t.tag === "head") {
      forSum = Buffer.from(t.data);
      forSum.writeUInt32BE(0, 8);
    }
    dir.writeUInt32BE(checksum(forSum), o + 4);
    dir.writeUInt32BE(offset, o + 8);
    dir.writeUInt32BE(t.data.length, o + 12);

    blobs.push(t.data);
    const padded = pad4(t.data.length);
    if (padded > t.data.length) blobs.push(Buffer.alloc(padded - t.data.length));
    offset = offset + padded;
  });

  const font = Buffer.concat([header, dir, ...blobs]);

  // checksumAdjustment = 0xB1B0AFBA - somme de contrôle du fichier entier
  const headIdx = tables.findIndex((t) => t.tag === "head");
  const headOff = dir.readUInt32BE(headIdx * 16 + 8);
  font.writeUInt32BE(0, headOff + 8);
  font.writeUInt32BE((0xb1b0afba - checksum(font)) >>> 0, headOff + 8);
  return font;
}

/* ---------- TTF -> WOFF ---------- */
function ttfToWoff(ttf) {
  const tables = readTables(ttf).sort((a, b) => (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
  const dirOfTag = {};
  const num = ttf.readUInt16BE(4);
  for (let i = 0; i < num; i++) {
    const o = 12 + i * 16;
    dirOfTag[ttf.toString("ascii", o, o + 4)] = ttf.readUInt32BE(o + 4);
  }

  let totalSfntSize = 12 + 16 * tables.length;
  for (const t of tables) totalSfntSize += pad4(t.data.length);

  const entries = [];
  const blobs = [];
  let dataOffset = 44 + 20 * tables.length;

  for (const t of tables) {
    const deflated = zlib.deflateSync(t.data, { level: 9 });
    // La spec impose de stocker en clair si la compression n'apporte rien.
    const data = deflated.length < t.data.length ? deflated : t.data;
    entries.push({ tag: t.tag, offset: dataOffset, compLength: data.length, origLength: t.data.length, checksum: dirOfTag[t.tag] });
    blobs.push(data);
    const padded = pad4(data.length);
    if (padded > data.length) blobs.push(Buffer.alloc(padded - data.length));
    dataOffset += padded;
  }

  const header = Buffer.alloc(44);
  header.write("wOFF", 0, "ascii");
  header.writeUInt32BE(0x00010000, 4);
  header.writeUInt32BE(dataOffset, 8);
  header.writeUInt16BE(tables.length, 12);
  header.writeUInt16BE(0, 14);
  header.writeUInt32BE(totalSfntSize, 16);
  header.writeUInt16BE(1, 20);
  header.writeUInt16BE(0, 22);

  const dir = Buffer.alloc(20 * entries.length);
  entries.forEach((e, i) => {
    const o = i * 20;
    dir.write(e.tag, o, "ascii");
    dir.writeUInt32BE(e.offset, o + 4);
    dir.writeUInt32BE(e.compLength, o + 8);
    dir.writeUInt32BE(e.origLength, o + 12);
    dir.writeUInt32BE(e.checksum, o + 16);
  });

  return Buffer.concat([header, dir, ...blobs]);
}

/* ---------- exécution ---------- */
const ttf = fs.readFileSync(SRC);
const tables = readTables(ttf);
const cmapTable = tables.find((t) => t.tag === "cmap");
const map = readCmap(cmapTable.data);

const before = map.size;
const folded = [];
for (const [accented, base] of Object.entries(FOLD)) {
  const cp = accented.codePointAt(0);
  const baseCp = base.codePointAt(0);
  if (map.has(cp) || !map.has(baseCp)) continue;
  map.set(cp, map.get(baseCp));
  folded.push(accented);
}
cmapTable.data = writeCmap(map);

const patched = buildSfnt(tables);
const woff = ttfToWoff(patched);
fs.writeFileSync(WOFF, woff);

const css = `/* ============================================================
   POLICE DES TITRES · ${FAMILY}, intégrée en base64.
   Appliquée aux <h2> uniquement (font-display dans globals.css).
   NE PAS ÉDITER À LA MAIN · régénérer : node scripts/build-font-css.js
   ============================================================ */
@font-face {
  font-family: "${FAMILY}";
  src: url("data:font/woff;base64,${woff.toString("base64")}") format("woff");
  /* La fonte n'a qu'une graisse et les titres sont en font-extrabold : déclarer
     la plage complète évite que le navigateur fabrique un gras synthétique,
     qui empâterait les blocs tamponnés. */
  font-weight: 100 900;
  font-style: normal;
  font-display: block;
}
`;
fs.writeFileSync(CSS, css);

const ko = (n) => Math.round(n / 1024) + " Ko";
console.log(`${FAMILY} : ${before} caractères + ${folded.length} remappés = ${map.size}`);
console.log(`  remappés : ${folded.join(" ")}`);
const MISSING = [..."0123456789'’&:!?()-–—«»"].filter((c) => !map.has(c.codePointAt(0)));
console.log(`  MANQUANTS (rendus par la police système) : ${MISSING.join(" ")}`);
console.log(`TTF ${ko(ttf.length)} -> WOFF ${ko(woff.length)} -> CSS ${ko(css.length)}`);
console.log(`Écrits : ${path.relative(ROOT, WOFF)} · ${path.relative(ROOT, CSS)}`);
