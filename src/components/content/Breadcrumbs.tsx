export type Crumb = { name: string; path: string };

/** Visible trail (the home link is added first); the last item is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Zyrobe", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-soft">{c.name}</span>
              ) : (
                <>
                  <a href={c.path} className="transition-colors hover:text-ink">{c.name}</a>
                  <span aria-hidden className="text-taupe">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
