export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    alternates: {
      canonical: `https://www.ivexiapharma.com/news/${slug}`,
    },
  };
}

export default function NewsDetailLayout({ children }) {
  return children;
}
