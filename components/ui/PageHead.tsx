/** The consistent title block every section page opens with. */
export function PageHead({ title, lede, tone = "cream" }: {
  title: string; lede: string; tone?: "cream" | "paper" | "dark";
}) {
  const bg = tone === "paper" ? "bg-paper" : tone === "dark" ? "bg-espresso text-cream-ink" : "bg-cream";
  return (
    <header className={`${bg} px-6 pb-10 pt-28 sm:pt-32`}>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">{title}</h1>
        <p className={`mt-3 max-w-2xl text-lg ${tone === "dark" ? "text-cream-ink/80" : "text-espresso/75"}`}>{lede}</p>
      </div>
    </header>
  );
}
