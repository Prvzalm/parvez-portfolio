import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "../data/site";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });
const siteUrl = /^https?:\/\//.test(site.siteUrl) ? site.siteUrl : undefined;

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.description,
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: "Products, systems and experiences for the web.",
    type: "website",
    ...(siteUrl ? { url: siteUrl, images: [{ url: "/og-image.png", alt: "Parvez Alam — Full-Stack Developer" }] } : {})
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: "Products, systems and experiences for the web."
  },
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Parvez Alam",
              jobTitle: "Full-Stack Developer",
              ...(siteUrl ? { url: siteUrl } : {}),
              sameAs: [site.githubUrl, site.linkedInUrl]
            })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              description: site.description,
              ...(siteUrl ? { url: siteUrl } : {})
            })
          }}
        />
      </body>
    </html>
  );
}
