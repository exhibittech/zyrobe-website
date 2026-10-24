import type { Metadata, Viewport } from "next";
import { Lato, Noto_Serif_Display } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import JsonLd from "@/components/closing/JsonLd";
import { COMPANY, CONTACT_EMAIL, PLAY_LIVE, PLAY_URL, PROMISE, SHORT_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Noto_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const TITLE = `Zyrobe — ${PROMISE}`;
const DESCRIPTION =
  "Zyrobe keeps all your clothes in one app. Snap a photo and it sorts them, then try outfits on with AI, get looks from an AI stylist, plan your week and pack for trips.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Zyrobe" },
  description: DESCRIPTION,
  applicationName: "Zyrobe",
  keywords: [
    "Zyrobe", "wardrobe app", "digital wardrobe", "AI stylist", "virtual try-on", "outfit planner",
    "closet organizer", "outfit ideas", "packing list", "what to wear", "fashion app India",
  ],
  authors: [{ name: COMPANY }],
  creator: COMPANY,
  publisher: COMPANY,
  category: "lifestyle",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zyrobe",
    locale: "en_IN",
    title: TITLE,
    description: SHORT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SHORT_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false, email: false, address: false },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: COMPANY,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      logo: `${SITE_URL}/icon-512.png`,
    },
    {
      "@type": "MobileApplication",
      name: "Zyrobe",
      url: SITE_URL,
      description: DESCRIPTION,
      operatingSystem: "ANDROID",
      applicationCategory: "LifestyleApplication",
      image: `${SITE_URL}/opengraph-image.png`,
      publisher: { "@id": `${SITE_URL}/#org` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      ...(PLAY_LIVE ? { installUrl: PLAY_URL, downloadUrl: PLAY_URL } : {}),
    },
    { "@type": "WebSite", name: "Zyrobe", url: SITE_URL, publisher: { "@id": `${SITE_URL}/#org` } },
  ],
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
        <JsonLd data={appJsonLd} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
