import "server-only";

import { FINISHED_PRODUCTS } from "@/data/finishedProducts";
import INGREDIENTS from "@/data/ingredients";
import { TEST_KITS } from "@/data/testKits";

function normalizeSlug(slug) {
  return String(slug || "").trim().toLowerCase();
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function findBySlug(items, slug) {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  return items.find((item) => normalizeSlug(item?.slug) === normalizedSlug) || null;
}

export function getProducts() {
  return cloneData(FINISHED_PRODUCTS);
}

export function getProductBySlug(slug) {
  const product = findBySlug(FINISHED_PRODUCTS, slug);
  return product ? cloneData(product) : null;
}

export function getIngredients() {
  return cloneData(INGREDIENTS);
}

export function getIngredientBySlug(slug) {
  const ingredient = findBySlug(INGREDIENTS, slug);
  return ingredient ? cloneData(ingredient) : null;
}

export function getTestKits() {
  return cloneData(TEST_KITS);
}

export function getTestKitBySlug(slug) {
  const testKit = findBySlug(TEST_KITS, slug);
  return testKit ? cloneData(testKit) : null;
}
