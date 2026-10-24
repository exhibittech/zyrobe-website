import type { Metadata, Viewport } from "next";
import { Lato, Noto_Serif_Display } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { PROMISE, SHORT_DESCRIPTION, SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Zyrobe — ${PROMISE}`, template: "%s · Zyrobe" },
  description: SHORT_DESCRIPTION,
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
