//ivexia\app\news\[slug]\page.jsx
"use client";

import { useParams } from "next/navigation";
import newsPosts from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { translations } = useLanguage();

  const post = newsPosts.find((p) => p.slug === slug);
  const postData = translations?.news?.posts?.[slug];

  if (!post || !postData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>{translations?.news?.notFound}</h1>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">

      <Link href="/" className="text-[#E2004F] mb-6 inline-block">
        ← {translations?.news?.back}
      </Link>

      <Image
        src={post.img}
        width={1000}
        height={500}
        alt={postData.title}
        className="rounded-xl mb-8 object-cover"
      />

      <p className="text-sm text-[#19a6b5] uppercase mb-2">
        {postData.category} • {postData.date}
      </p>

      <h1 className="text-4xl font-bold text-[#0d2d47] mb-6">
        {postData.title}
      </h1>

      <p className="text-gray-700 whitespace-pre-line">
        {postData.content}
      </p>

    </section>
  );
}





// //ivexia\app\news\[slug]\page.jsx
// "use client";

// import { useParams } from "next/navigation";
// import newsPosts from "@/data/news";
// import Image from "next/image";
// import Link from "next/link";

// export default function NewsDetailPage() {
//   const { slug } = useParams();

//   const post = newsPosts.find((p) => p.slug === slug);

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-2xl font-bold">Article Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-4xl mx-auto px-6 py-20">
      
//       <Link href="/" className="text-[#E2004F] mb-6 inline-block">
//         ← Back
//       </Link>

//       <Image
//         src={post.img}
//         width={1000}
//         height={500}
//         alt={post.title}
//         className="rounded-xl mb-8 object-cover"
//       />

//       <p className="text-sm text-[#19a6b5] uppercase mb-2">
//         {post.category} • {post.date}
//       </p>

//       <h1 className="text-4xl font-bold text-[#0d2d47] mb-6">
//         {post.title}
//       </h1>

//       <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//         {post.content}
//       </p>

//     </section>
//   );
// }