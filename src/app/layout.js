import Providers from "@/components/Providers";

export const metadata = { title: "Simple Store" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ maxWidth: 900, margin: "0 auto" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
