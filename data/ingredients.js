// ivexia\data\ingredients.js
const COMMON_IMAGE = "/src/assets/logo/capsuleimage.jpg";

const INGREDIENTS = [
  // ---- CARDIOLOGY ----
  {
    id: "amiodarone",
    nameKey: "ingredients.amiodarone.name",
    descKey: "ingredients.amiodarone.desc",
    categoryKey: "ingredients.categories.cardiology",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "amiodarone-hcl",
    cas: "",
    badges: ["GMP"],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "atorvastatin",
    nameKey: "ingredients.atorvastatin.name",
    descKey: "ingredients.atorvastatin.desc",
    categoryKey: "ingredients.categories.cardiology",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "atorvastatin-calcium",
    cas: "",
    badges: ["GMP"],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "amlodipine",
    nameKey: "ingredients.amlodipine.name",
    descKey: "ingredients.amlodipine.desc",
    categoryKey: "ingredients.categories.cardiology",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "amlodipine-besylate",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- ANTIBIOTICS ----
  {
    id: "azithromycin",
    nameKey: "ingredients.azithromycin.name",
    descKey: "ingredients.azithromycin.desc",
    categoryKey: "ingredients.categories.anti_infective",
    dosageKeys: ["ingredients.forms.tablet", "ingredients.forms.capsule"],
    slug: "azithromycin",
    cas: "",
    badges: ["GMP"],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "amoxicillin",
    nameKey: "ingredients.amoxicillin.name",
    descKey: "ingredients.amoxicillin.desc",
    categoryKey: "ingredients.categories.anti_infective",
    dosageKeys: ["ingredients.forms.tablet", "ingredients.forms.capsule"],
    slug: "amoxicillin",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "clarithromycin",
    nameKey: "ingredients.clarithromycin.name",
    descKey: "ingredients.clarithromycin.desc",
    categoryKey: "ingredients.categories.anti_infective",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "clarithromycin",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- ANALGESIC / PAIN ----
  {
    id: "codeine-sulfate",
    nameKey: "ingredients.codeine.name",
    descKey: "ingredients.codeine.desc",
    categoryKey: "ingredients.categories.pain",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "codeine-sulfate",
    cas: "",
    badges: ["GMP"],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "tramadol",
    nameKey: "ingredients.tramadol.name",
    descKey: "ingredients.tramadol.desc",
    categoryKey: "ingredients.categories.pain",
    dosageKeys: [
      "ingredients.forms.tablet",
      "ingredients.forms.injection"
    ],
    slug: "tramadol-hcl",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "diclofenac",
    nameKey: "ingredients.diclofenac.name",
    descKey: "ingredients.diclofenac.desc",
    categoryKey: "ingredients.categories.pain",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "diclofenac-sodium",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- DIABETES / METABOLIC ----
  {
    id: "metformin",
    nameKey: "ingredients.metformin.name",
    descKey: "ingredients.metformin.desc",
    categoryKey: "ingredients.categories.endocrinology",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "metformin-hcl",
    cas: "",
    badges: ["GMP"],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "sitagliptin",
    nameKey: "ingredients.sitagliptin.name",
    descKey: "ingredients.sitagliptin.desc",
    categoryKey: "ingredients.categories.endocrinology",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "sitagliptin-phosphate",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- RESPIRATORY ----
  {
    id: "salbutamol",
    nameKey: "ingredients.salbutamol.name",
    descKey: "ingredients.salbutamol.desc",
    categoryKey: "ingredients.categories.respiratory",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "salbutamol-sulphate",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "montelukast",
    nameKey: "ingredients.montelukast.name",
    descKey: "ingredients.montelukast.desc",
    categoryKey: "ingredients.categories.respiratory",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "montelukast-sodium",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- GASTRO ----
  {
    id: "omeprazole",
    nameKey: "ingredients.omeprazole.name",
    descKey: "ingredients.omeprazole.desc",
    categoryKey: "ingredients.categories.gastro",
    dosageKeys: ["ingredients.forms.capsule"],
    slug: "omeprazole",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "pantoprazole",
    nameKey: "ingredients.pantoprazole.name",
    descKey: "ingredients.pantoprazole.desc",
    categoryKey: "ingredients.categories.gastro",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "pantoprazole-sodium",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },

  // ---- VITAMINS / NUTRA ----
  {
    id: "vitamin-c",
    nameKey: "ingredients.vitamin_c.name",
    descKey: "ingredients.vitamin_c.desc",
    categoryKey: "ingredients.categories.nutraceutical",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "vitamin-c",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  },
  {
    id: "vitamin-b12",
    nameKey: "ingredients.vitamin_b12.name",
    descKey: "ingredients.vitamin_b12.desc",
    categoryKey: "ingredients.categories.nutraceutical",
    dosageKeys: ["ingredients.forms.tablet"],
    slug: "vitamin-b12",
    cas: "",
    badges: [],
    synonyms: [],
    specs: [],
    image: COMMON_IMAGE
  }
];

export default INGREDIENTS;
