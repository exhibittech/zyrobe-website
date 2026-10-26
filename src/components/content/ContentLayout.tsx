import type { ReactNode } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

/** Inner page frame: the site nav and footer, with hash links pointing back to the home page. */
export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav onHome={false} />
      <main className="bg-cream text-ink">{children}</main>
      <Footer onHome={false} />
    </>
  );
}
