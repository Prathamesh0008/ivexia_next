//ivexia\app\layout.js
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Breadcrumbs from "@/components/Breadcrumbs";
export const metadata = {
  title: "Ivexia",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Navbar />

        {/* 🔥 Push everything below navbar */}
        <main className="pt-[72px] min-h-screen text-[#0d2d47]">
          <Breadcrumbs />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}