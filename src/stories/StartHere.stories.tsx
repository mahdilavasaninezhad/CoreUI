import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Asterisk, BookOpen, Code2, Component, MousePointerClick, Palette, SlidersHorizontal, Sparkles } from 'lucide-react';

function Guide() {
  const steps = [
    { number: '01', title: 'Find your component', fa: 'کامپوننت را پیدا کن', description: 'Pick any component from the sidebar. Every component includes live examples and documentation.', icon: Component, href: '?path=/story/01-actions-button--playground' },
    { number: '02', title: 'Make it yours', fa: 'ویژگی‌ها را تغییر بده', description: 'Open Playground and use Controls. Change size, variants, states, content and accessibility props.', icon: SlidersHorizontal, href: '?path=/story/02-forms-textfield--playground' },
    { number: '03', title: 'Build with confidence', fa: 'با اطمینان استفاده کن', description: 'Review the Docs and copy the JSX into your own React application.', icon: Code2, href: '?path=/docs/01-actions-button--docs' }
  ];
  return <div className="cu-welcome">
    <div className="cu-welcome-hero"><div className="cu-welcome-top"><span className="cu-welcome-identity"><Asterisk size={23}/>COREUI STUDIO</span><span>REACT + TYPESCRIPT / V3.0</span></div><div className="cu-welcome-copy"><span className="cu-welcome-kicker"><Sparkles size={15}/> AN INTERACTIVE DESIGN SYSTEM</span><h1>Make every<br/><em>pixel</em> matter.</h1><p>Explore the system, experiment with actual component props and learn what makes a useful interface feel extraordinary.</p><span className="cu-welcome-fa">کامپوننت‌ها را پیدا کن، تغییر بده و در پروژه خودت استفاده کن.</span></div><div className="cu-welcome-orb"><Asterisk size={95} strokeWidth={1.1}/></div></div>
    <div className="cu-welcome-content"><div className="cu-welcome-intro"><span>THE SIMPLE WORKFLOW / 001</span><h2>Find it. Try it. Build it.</h2><p>Three steps from discovery to production-ready JSX.</p></div><div className="cu-welcome-steps">{steps.map(({ number, title, fa, description, icon: Icon, href }) => <a key={number} href={href} className="cu-welcome-step"><span className="cu-welcome-step-head">{number}<ArrowRight size={17}/></span><span className="cu-welcome-step-icon"><Icon size={25}/></span><strong>{title}</strong><small>{fa}</small><p>{description}</p></a>)}</div><div className="cu-welcome-foot"><span><Palette size={16}/> LIGHT / DARK · RTL / LTR</span><span><BookOpen size={16}/> 17 COMPONENT FAMILIES</span><a href="?path=/story/01-actions-button--playground">OPEN THE LAB <MousePointerClick size={17}/></a></div></div>
  </div>;
}

const meta = {
  title: '00 Start here/Welcome',
  component: Guide,
  tags: ['autodocs'],
  parameters: { controls: { disable: true }, layout: 'fullscreen', docs: { description: { component: 'CoreUI Studio is an independent, bilingual design system demonstration with interactive component documentation.' } } }
} satisfies Meta<typeof Guide>;

export default meta;
type Story = StoryObj<typeof meta>;
export const QuickStart: Story = {};
