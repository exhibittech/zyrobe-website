import type { Faq } from "@/components/closing/faq";

/** Questions and answers, always visible (for readers and for answer engines). Use inside `.legal`. */
export default function QaList({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>
            {f.a}
            {f.link ? (
              <>
                {" "}
                <a href={f.link.href}>{f.link.label}</a>
              </>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}
