export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="section-heading"><div className="section-eyebrow"><span className="eyebrow-marker" />{eyebrow}</div><h1>{title}</h1><p>{description}</p></header>;
}
