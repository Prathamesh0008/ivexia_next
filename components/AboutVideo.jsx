//ivexia\components\AboutVideo.jsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
export default function AboutVideo() {
  const { translations } = useLanguage();
  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/aboutvideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-16 text-white">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
             {translations?.about?.video?.title}
          </h2>

          <p className="text-lg md:text-xl mb-6 text-gray-200">
            {translations?.about?.video?.subtitle}
          </p>
<p className="text-lg md:text-xl mb-6 text-gray-300">
  {translations?.about?.video?.paragraph}
</p>
          <Link
            href="/ivexia-mag"
            className="bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition"
          >
           {translations?.about?.video?.cta}
          </Link>
        </div>
      </div>

    </section>
  );
}






// "use client";

// import Link from "next/link";

// export default function AboutVideo() {
//   return (
//     <section className="relative w-full h-[80vh] md:h-screen overflow-hidden">

//       {/* Background Video */}
//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="/images/aboutvideo.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Content */}
//       <div className="relative z-10 flex items-center h-full px-6 md:px-16 text-white">
//         <div className="max-w-3xl">
//           <h2 className="text-4xl md:text-6xl font-bold mb-4">
//             About Ivexia Pharmaceuticals
//           </h2>

//           <p className="text-lg md:text-xl mb-6 text-gray-200">
//             Global Vision. Scientific Excellence. Delivering innovation in healthcare.
//           </p>

//           <Link
//             href="/ivexia-mag"
//             className="bg-gradient-to-r from-[#FF7A00] to-[#E2004F] px-6 py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition"
//           >
//             Explore More
//           </Link>
//         </div>
//       </div>

//     </section>
//   );
// }