import JsonLd from "@/components/closing/JsonLd";
import Article from "@/components/content/Article";
import ContentHeader from "@/components/content/ContentHeader";
import ContentLayout from "@/components/content/ContentLayout";
import CtaBand from "@/components/content/CtaBand";
import DataTable from "@/components/content/DataTable";
import { contentMetadata } from "@/components/content/meta";
import { CREDIT_TABLE, FEATURES } from "@/content/features";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import {
  COMPANY, CONTACT_EMAIL, PLANS, PLAY_PACKAGE, PLAY_URL, PROMISE, SIGNUP_FREE_CREDITS, TAGLINE, TOPUPS,
} from "@/lib/site";

const UPDATED = "2026-10-26";
const TITLE = "About Zyrobe: the facts at a glance";
const DESCRIPTION = "Zyrobe is an Android wardrobe app with an AI stylist, made in India by Exhibit Technologies. What it does, what it costs, how it uses AI and handles your data.";

export const metadata = contentMetadata({ path: "/about", title: "About Zyrobe: AI wardrobe app made in India", description: DESCRIPTION });

const SECTIONS = [
  { id: "what-is-zyrobe", title: "What is Zyrobe?" },
  { id: "quick-facts", title: "Quick facts" },
  { id: "what-it-does", title: "What can Zyrobe do?" },
  { id: "pricing", title: "How much does Zyrobe cost?" },
  { id: "ai", title: "How does Zyrobe use AI?" },
  { id: "privacy", title: "How does Zyrobe handle my data?" },
  { id: "company", title: "Who makes Zyrobe?" },
  { id: "brand-assets", title: "Brand assets" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${abs("/about")}#webpage`,
    url: abs("/about"),
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: UPDATED,
    isPartOf: { "@id": abs("/#website") },
    about: { "@id": abs("/#org") },
    mainEntity: { "@id": abs("/#app") },
  },
  breadcrumbJsonLd([{ name: "About", path: "/about" }]),
];

const ASSETS = [
  { href: "/media/brand/logo.webp", label: "Zyrobe wordmark", note: "WebP, 1400 × 473, transparent" },
  { href: "/icon-512.png", label: "App icon", note: "PNG, 512 × 512" },
  { href: "/media/brand/feature.webp", label: "Feature graphic", note: "WebP, 1024 × 500" },
  { href: "/opengraph-image.png", label: "Share image", note: "PNG, 1200 × 630" },
];

export default function AboutPage() {
  const facts: [string, string][] = [
    ["Name", "Zyrobe"],
    ["What it is", "A wardrobe app with an AI stylist"],
    ["Promise", PROMISE],
    ["Made by", `${COMPANY}, India`],
    ["Platform", "Android, on Google Play"],
    ["Availability", "On Google Play in India"],
    ["Who it is for", "People aged 18 and over"],
    ["Price", `Free to download. Plans from ${PLANS[0].price} ${PLANS[0].period}`],
    ["Free credits", `${SIGNUP_FREE_CREDITS} for every new account, valid for one month`],
    ["Currency", "Indian rupees (₹)"],
    ["Android package", PLAY_PACKAGE],
    ["Website", "zyrobe.com"],
    ["Contact", CONTACT_EMAIL],
  ];

  return (
    <ContentLayout>
      <JsonLd data={jsonLd} />
      <ContentHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title={TITLE}
        lead={`Zyrobe is an Android wardrobe app with an AI stylist, made in India by ${COMPANY}. It keeps all your clothes in one place and helps you decide what to wear.`}
        updated={UPDATED}
      />

      <Article toc={SECTIONS}>
        <section aria-labelledby="what-is-zyrobe">
          <h2 id="what-is-zyrobe">What is Zyrobe?</h2>
          <p>
            Zyrobe is an Android wardrobe app for India. It keeps all your clothes in one place and helps you decide what to wear. Take a
            photo of your clothes and Zyrobe sorts them for you. Then try outfits on, plan your week and pack for trips, all from the clothes you already own.
          </p>
          <p>
            Its promise is <strong>{PROMISE}</strong> Its tagline is <strong>{TAGLINE}</strong>
          </p>
        </section>

        <section aria-labelledby="quick-facts">
          <h2 id="quick-facts">Quick facts</h2>
          <DataTable head={["Fact", "Zyrobe"]} caption="Zyrobe quick facts" rows={facts} />
          <p>
            Get Zyrobe on <a href={PLAY_URL}>Google Play</a>.
          </p>
        </section>

        <section aria-labelledby="what-it-does">
          <h2 id="what-it-does">What can Zyrobe do?</h2>
          <p>Zyrobe covers your wardrobe from the first photo to a packed suitcase.</p>
          <ul>
            {FEATURES.map((f) => (
              <li key={f.slug}>
                <a href={`/features/${f.slug}`}>{f.name}</a>: {f.description}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pricing">
          <h2 id="pricing">How much does Zyrobe cost?</h2>
          <p>
            Zyrobe is free to download, and every new account gets {SIGNUP_FREE_CREDITS} free credits, valid for one month. AI features
            use credits. For more, choose a monthly, 6-month or yearly plan. Plans renew automatically until you cancel them in Google
            Play.
          </p>
          <DataTable
            head={["Plan", "Credits", "Price"]}
            numeric
            caption="Zyrobe plans"
            rows={PLANS.map((p) => [p.name, `${p.credits.toLocaleString("en-IN")} credits`, `${p.price} ${p.period}`])}
          />
          <p>
            While a plan is active you can also buy credit packs:{" "}
            {TOPUPS.map((t) => `${t.credits} credits for ${t.price}`).join(", ")}. They last until your plan ends.
          </p>
          <DataTable
            head={["AI feature", "Credits"]}
            numeric
            caption="Credits each AI feature uses"
            rows={CREDIT_TABLE.map((c) => [c.action, `${c.credits} ${c.credits === 1 ? "credit" : "credits"}`])}
          />
        </section>

        <section aria-labelledby="ai">
          <h2 id="ai">How does Zyrobe use AI?</h2>
          <p>Zyrobe uses AI to read your clothing photos, make product photos and try-on images, and suggest outfits and plans.</p>
          <ul>
            <li>Google&apos;s Gemini analyses clothing photos and writes outfit suggestions.</li>
            <li>Image models run on RunPod create product photos and try-on images.</li>
            <li>Outfit suggestions, weekly plans and packing lists take the weather into account.</li>
            <li>If an AI feature fails to give you a result, the credits it used go back to you.</li>
            <li>AI images are previews. They may not match exactly how clothes look or fit in real life.</li>
          </ul>
        </section>

        <section aria-labelledby="privacy">
          <h2 id="privacy">How does Zyrobe handle my data?</h2>
          <p>Your photos belong to you. They are never shown to other users, never sold and never used for advertising.</p>
          <ul>
            <li>Your photos are not used to train AI models.</li>
            <li>The app has no advertising, no advertising IDs and no third-party analytics or tracking tools.</li>
            <li>Your data is stored on Google Cloud in the Mumbai region, India, and encrypted in transit and at rest.</li>
            <li>For the weather, Zyrobe uses only your approximate city, from your internet connection. It does not use GPS.</li>
            <li>Payments go through Google Play. Zyrobe never sees your card or UPI details.</li>
            <li>
              Deleting your account removes everything, including your photos and AI results. Backup copies are removed within 30
              days.
            </li>
            <li>Requests about your data are handled in line with India&apos;s Digital Personal Data Protection Act, 2023.</li>
          </ul>
          <p>
            <a href="/privacy">Read the full privacy policy</a>
          </p>
        </section>

        <section aria-labelledby="company">
          <h2 id="company">Who makes Zyrobe?</h2>
          <p>
            Zyrobe is made by {COMPANY} in India. Write to us any time at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section aria-labelledby="brand-assets">
          <h2 id="brand-assets">Brand assets</h2>
          <p>For articles and listings about Zyrobe, use these files.</p>
          <ul>
            {ASSETS.map((a) => (
              <li key={a.href}>
                <a href={a.href}>{a.label}</a> ({a.note})
              </li>
            ))}
          </ul>
        </section>
      </Article>

      <CtaBand />
    </ContentLayout>
  );
}
