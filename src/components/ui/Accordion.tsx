import { ChevronDown } from 'lucide-react';

export interface AccordionItem { title: string; content: string }
export function Accordion({ items }: { items: AccordionItem[] }) {
  return <div className="cu-accordion">{items.map((item, index) => <details key={index} className="cu-accordion-item"><summary>{item.title}<ChevronDown size={17} /></summary><div className="cu-accordion-answer">{item.content}</div></details>)}</div>;
}
