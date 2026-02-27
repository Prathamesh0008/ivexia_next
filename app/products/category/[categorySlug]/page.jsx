export default function Page({ params }) {
  return (
    <div style={{ padding: "100px 20px" }}>
      <h1>Category: {params.categorySlug}</h1>
    </div>
  );
}