import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = { title: "Simple Store" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh grid grid-rows-[auto_1fr_auto] bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          <Navbar />
          {/* content row */}
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
