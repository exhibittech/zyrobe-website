import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/ui/SmoothScroll";
import JsonLd from "@/components/closing/JsonLd";
import { COMPANY, SHORT_DESCRIPTION, SITE_URL } from "@/lib/site";
import { DESCRIPTION, KEYWORDS, TITLE, pageAlternates, siteJsonLd } from "@/lib/seo";
import "./globals.css";

// Noto Serif Display (the launch film's display face), subset to the characters the site uses
// (Latin-1, typographic punctuation, ₹): ~12 KB per style instead of ~170 KB from Google Fonts.
const display = localFont({
  variable: "--font-display",
  src: [
    { path: "../fonts/NotoSerifDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/NotoSerifDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NotoSerifDisplay-LightItalic.woff2", weight: "300", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const body = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const GSC = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const BING = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Zyrobe" },
  description: DESCRIPTION,
  applicationName: "Zyrobe",
  keywords: KEYWORDS,
  authors: [{ name: COMPANY }],
  creator: COMPANY,
  publisher: COMPANY,
  category: "lifestyle",
  // Inner pages set their own (pageAlternates("/path")); a page without it would point its canonical here.
  alternates: pageAlternates("/"),
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zyrobe",
    locale: "en_IN",
    title: TITLE,
    description: SHORT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SHORT_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Search Console / Bing Webmaster Tools ownership tags, only when the tokens are set at build time.
  ...(GSC || BING
    ? { verification: { ...(GSC ? { google: GSC } : {}), ...(BING ? { other: { "msvalidate.01": BING } } : {}) } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={siteJsonLd()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
