import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const targetLang = (process.argv[2] || "nl").toLowerCase();
const deeplTargetLang = (process.argv[3] || targetLang).toUpperCase();

const sourcePath = path.join(projectRoot, "data2", "languages", "en.js");
const outputPath = path.join(projectRoot, "data2", "languages", `${targetLang}.js`);
const cacheDir = path.join(projectRoot, "scripts", ".translation-cache");
const cachePath = path.join(cacheDir, `${targetLang}.json`);

const deeplApiKey = process.env.DEEPL_API_KEY;
const deeplApiUrl =
  process.env.DEEPL_API_URL || "https://api-free.deepl.com/v2/translate";

if (!deeplApiKey) {
  console.error("DEEPL_API_KEY is missing. Add it to .env.local first.");
  process.exit(1);
}

const { en } = await import(pathToFileURL(sourcePath).href);

function shouldTranslate(value) {
  if (!value || typeof value !== "string") return false;

  const trimmed = value.trim();

  if (!trimmed) return false;
  if (/^https?:\/\//i.test(trimmed)) return false;
  if (/^[\d\s.,/%+\-()]+$/.test(trimmed)) return false;
  if (/^\d{2,7}-\d{2}-\d$/.test(trimmed)) return false;

  return /[a-z]/i.test(trimmed);
}

function collectStrings(value, output = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, output));
    return output;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectStrings(item, output));
    return output;
  }

  if (shouldTranslate(value)) {
    output.add(value);
  }

  return output;
}

function chunkStrings(strings) {
  const chunks = [];
  let current = [];
  let currentSize = 0;

  for (const text of strings) {
    const size = Buffer.byteLength(text, "utf8");

    if (current.length >= 45 || currentSize + size > 45000) {
      chunks.push(current);
      current = [];
      currentSize = 0;
    }

    current.push(text);
    currentSize += size;
  }

  if (current.length > 0) {
    chunks.push(current);
  }

  return chunks;
}

async function readCache() {
  try {
    return JSON.parse(await readFile(cachePath, "utf8"));
  } catch {
    return {};
  }
}

async function saveCache(cache) {
  await mkdir(cacheDir, { recursive: true });
  await writeFile(cachePath, JSON.stringify(cache, null, 2), "utf8");
}

async function translateBatch(texts) {
  const body = new URLSearchParams();

  for (const text of texts) {
    body.append("text", text);
  }

  body.set("source_lang", "EN");
  body.set("target_lang", deeplTargetLang);
  body.set("preserve_formatting", "1");

  const response = await fetch(deeplApiUrl, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplApiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepL failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  return result.translations.map((item) => item.text);
}

function applyTranslations(value, cache) {
  if (Array.isArray(value)) {
    return value.map((item) => applyTranslations(item, cache));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        applyTranslations(item, cache),
      ])
    );
  }

  if (shouldTranslate(value)) {
    return cache[value] || value;
  }

  return value;
}

const cache = await readCache();
const strings = [...collectStrings(en)];
const missing = strings.filter((text) => !cache[text]);
const chunks = chunkStrings(missing);

console.log(`Target language: ${targetLang} (${deeplTargetLang})`);
console.log(`Unique English strings: ${strings.length}`);
console.log(`Missing translations: ${missing.length}`);

for (let index = 0; index < chunks.length; index += 1) {
  const chunk = chunks[index];
  const translated = await translateBatch(chunk);

  chunk.forEach((text, textIndex) => {
    cache[text] = translated[textIndex];
  });

  await saveCache(cache);
  console.log(`Translated batch ${index + 1}/${chunks.length}`);
}

const translatedData = applyTranslations(en, cache);
const fileContents = `// Auto-generated from data2/languages/en.js by scripts/translate-product-language.js
export const ${targetLang} = ${JSON.stringify(translatedData, null, 2)};
`;

await writeFile(outputPath, fileContents, "utf8");
console.log(`Done: ${path.relative(projectRoot, outputPath)}`);
