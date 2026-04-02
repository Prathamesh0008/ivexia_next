export default async function sitemap() {
  const baseUrl = "https://www.ivexiapharma.com";
 
  // 1. Static pages
  const pages = ["", "/about", "/contact", "/products"];
 
  const staticUrls = pages.map((page) => ({
    url: baseUrl + page,
    lastModified: new Date(),
  }));
 
  // 2. Products (from API)
  let productUrls = [];
 
  try {
    const res = await fetch(baseUrl + "/api/products");
    const products = await res.json();
 
    productUrls = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
    }));
  } catch (e) {
    console.log("Error loading products");
  }
 
  // 3. Ingredients (optional)
  let ingredientUrls = [];
 
  try {
    const res = await fetch(baseUrl + "/api/ingredients");
    const ingredients = await res.json();
 
    ingredientUrls = ingredients.map((i) => ({
      url: `${baseUrl}/products/ingredient/${i.slug}`,
      lastModified: new Date(),
    }));
  } catch (e) {
    console.log("Error loading ingredients");
  }
 
  return [...staticUrls, ...productUrls, ...ingredientUrls];
}