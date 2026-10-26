import { COMPANY, CONTACT_EMAIL, TAGLINE } from "@/lib/site";

const cols = [
  { title: "Product", links: [["How it works", "#features"], ["Pricing", "#pricing"], ["Download", "#download"]] },
  { title: "Explore", links: [["All features", "/features"], ["Guides", "/guides"], ["About Zyrobe", "/about"], ["FAQ", "/faq"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Delete account & data", "/privacy#delete-account"], ["AI & crawler policy", "/ai-policy"]] },
] as const;

/** `onHome={false}` on other pages, so the product links point back to the home page. */
export default function Footer({ onHome = true }: { onHome?: boolean }) {
  return (
    <footer data-nosnippet className="relative border-t border-line bg-cream text-ink">
      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] md:py-20">
        <div className="col-span-2 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/logo-sm.webp" alt="Zyrobe" width={520} height={176} loading="lazy" className="h-9 w-auto" />
          <p className="mt-4 font-serif text-xl font-light italic text-ink-soft">{TAGLINE}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="eyebrow text-muted">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <a href={!onHome && href.startsWith("#") ? `/${href}` : href} className="text-ink-soft transition-colors hover:text-ink">{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <p className="eyebrow text-muted">Contact</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 block text-ink-soft [overflow-wrap:anywhere] transition-colors hover:text-ink">{CONTACT_EMAIL}</a>
          <p className="mt-2 text-sm text-muted">Made in India</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY}. Zyrobe is a product of Exhibit Technologies.</p>
          <p>Android app · India</p>
        </div>
      </div>
    </footer>
  );
}
