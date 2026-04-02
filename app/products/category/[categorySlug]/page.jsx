export default async function Page({ params }) {
  const { categorySlug } = await params;

  return (
    <div style={{ padding: "100px 20px" }}>
      <h1>Category: {categorySlug}</h1>
    </div>
  );
}
