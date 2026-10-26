import type { ReactNode } from "react";
import LegalToc from "@/components/legal/LegalToc";

/** Reading column with the sticky "On this page" list beside it (desktop). */
export default function Article({ toc, children }: { toc: { id: string; title: string }[]; children: ReactNode }) {
  return (
    <div className="wrap grid gap-12 pb-20 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 md:pb-28 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden md:block">
        <LegalToc items={toc} />
      </aside>
      <article className="legal min-w-0 max-w-[68ch]">{children}</article>
    </div>
  );
}
