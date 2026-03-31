// //ivexia\app\layout.js
// import "./globals.css";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// import Breadcrumbs from "@/components/Breadcrumbs";
// export const metadata = {
//   title: "Ivexia",
//   icons: {
//     icon: "/icon.png",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//       <body>
//         <Navbar />

//         {/* 🔥 Push everything below navbar */}
//         <main className="pt-[72px] min-h-screen text-[#0d2d47]">
//           <Breadcrumbs />
//           {children}
//         </main>

//         <Footer />
//       </body>
//     </html>
//   );
// }


// ivexia/app/layout.js

import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

/* ===================== SEO METADATA ===================== */

export const metadata = {
  metadataBase: new URL("https://www.ivexiapharma.com"),

  title: {
    default:
      "Ivexia Pharma | Global Pharmaceutical Manufacturer & Exporter",
    template: "%s | Ivexia Pharma",
  },

  description:
    "Trusted pharmaceutical manufacturer and exporter delivering GMP-certified products for distributors, importers, and healthcare partners worldwide. Focused on quality, compliance, and global supply.",

  /* ✅ ADD THIS HERE */
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.png",
  },

  verification: {
    google: "_I5LLkQe5LBhnq6DBrhjM5ItivBo3Gk4tDuYDMT6BGo",
  },
};

/* ===================== ROOT LAYOUT ===================== */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* 🔥 Google Tag Manager */}
        <Script
  id="gtm-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-58W2SCQH');
    `,
  }}
/>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-58W2SCQH');
          `}
       

        {/* 🔥 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1B07YW0LT0"
          strategy="afterInteractive"
        />
       <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-1B07YW0LT0"
  strategy="afterInteractive"
/>

<Script
  id="ga-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-1B07YW0LT0');
    `,
  }}
/>

        {/* 🔥 ORGANIZATION SCHEMA */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.ivexiapharma.com/#organization",
              name: "Ivexia Pharma",
              alternateName: "Ivexia Pharmaceuticals",
              url: "https://www.ivexiapharma.com/",
              logo:
                "https://www.ivexiapharma.com/images/Websiteivexia.png",
              description:
                "Ivexia Pharma is a pharmaceutical company specializing in high-quality healthcare products.",
              email: "info@ivexiapharma.com",
              foundingDate: "2020",
              slogan: "Innovating Healthcare, Improving Lives",
            }),
          }}
        />

        {/* 🔥 WEBSITE SCHEMA */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.ivexiapharma.com/#website",
              url: "https://www.ivexiapharma.com/",
              name: "Ivexia Pharma",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.ivexiapharma.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body>
        {/* 🔥 GTM NOSCRIPT */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58W2SCQH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Suspense fallback={null}>
          <Navbar />
        </Suspense>

        <main className="pt-[88px] min-h-screen text-[#0d2d47]">
          {/* <Breadcrumbs /> */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
