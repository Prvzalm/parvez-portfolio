import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parvez Alam — Full-Stack Developer",
  description:
    "Parvez Alam builds modern web products, full-stack systems and useful digital experiences.",
  metadataBase: new URL("https://parvezalam.dev"),
  openGraph: {
    title: "Parvez Alam — Full-Stack Developer",
    description: "Products, systems and experiences for the web.",
    type: "website",
    url: "https://parvezalam.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: "Parvez Alam — Full-Stack Developer",
    description: "Products, systems and experiences for the web."
  },
  alternates: { canonical: "https://parvezalam.dev" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Parvez Alam",
              jobTitle: "Full-Stack Developer",
              url: "https://parvezalam.dev",
              sameAs: ["https://github.com/Prvzalm", "https://www.linkedin.com/in/parvez013"]
            })
          }}
        />
      </body>
    </html>
  );
}
