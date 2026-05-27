import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { default: dbConnect } = await import("../lib/dbConnect.js");
const { default: Translation } = await import("../models/Translation.js");

const GROUPS = ["data1", "data2", "data3", "data4"];
const LANGUAGES = ["en", "ar", "de", "es", "fr", "ja", "nl", "pt", "zh"];
const MAX_MONGO_DOCUMENT_BYTES = 16 * 1024 * 1024;

function getExportedLanguageData(module, language) {
  return module[language] || module.default;
}

function assertMongoDocumentSize(group, language, data) {
  const approximateBytes = Buffer.byteLength(
    JSON.stringify({ group, language, data }),
    "utf8"
  );

  if (approximateBytes >= MAX_MONGO_DOCUMENT_BYTES) {
    throw new Error(
      `${group}/${language} is too large for one MongoDB document (${approximateBytes} bytes). Split this language file before seeding.`
    );
  }

  return approximateBytes;
}

console.log("Starting translation seed...");

await dbConnect();
console.log("DB connected");

let seededCount = 0;

for (const group of GROUPS) {
  for (const language of LANGUAGES) {
    const module = await import(`../${group}/languages/${language}.js`);
    const data = getExportedLanguageData(module, language);

    if (!data) {
      throw new Error(`No export found for ${group}/languages/${language}.js`);
    }

    const bytes = assertMongoDocumentSize(group, language, data);

    await Translation.updateOne(
      { group, language },
      { $set: { data } },
      { upsert: true }
    );

    seededCount += 1;
    console.log(`Upserted ${group}/${language} (${bytes} bytes)`);
  }
}

console.log(`Done. Upserted ${seededCount} translation documents.`);
process.exit(0);
