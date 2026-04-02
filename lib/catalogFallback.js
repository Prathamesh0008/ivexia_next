import FINISHED_PRODUCTS from "@/data/finishedProducts";
import { TEST_KITS } from "@/data/testKits";

export function normalizeProduct(product, index = 0) {
  return {
    _id: product._id || product.slug || `product-${product.id || index}`,
    category: product.category || "",
    name: product.name || "",
    dosage: product.dosage || "",
    form: product.form || "",
    packSize: product.packSize || product["PACK SIZE"] || "",
    type: product.type || product["TYPE OF FORMLN"] || "",
    casId: product.casId || product["CAS-ID"] || "",
    slug: product.slug || "",
    image: product.image || "",
    description: product.description || "",
  };
}

export function getFallbackProducts() {
  return FINISHED_PRODUCTS.map((product, index) =>
    normalizeProduct(product, index)
  );
}

export function normalizeTestKit(testKit, index = 0) {
  return {
    _id: testKit._id || testKit.slug || `testkit-${testKit.id || index}`,
    category: testKit.category || "",
    method: testKit.method || "",
    product: testKit.product || "",
    description: testKit.description || "",
    cut_off: testKit.cut_off || "",
    specimen: testKit.specimen || "",
    certificate: testKit.certificate || "",
    slug: testKit.slug || "",
  };
}

export function getFallbackTestKits() {
  return TEST_KITS.map((testKit, index) => normalizeTestKit(testKit, index));
}
