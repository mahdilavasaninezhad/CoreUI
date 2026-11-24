import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, BookOpen, MousePointerClick, Settings2 } from 'lucide-react';

function Guide() {
  return <div className="cu-story-surface" style={{ minWidth: 380, maxWidth: 600, gap: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 15 }}><span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em' }}>COREUI / COMPONENT STUDIO</span><BookOpen size={20} /></div>
    <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-.06em', margin: 0 }}>Find it. Try it. Use it.</h2>
    <p>Choose a component from the sidebar. Open its Playground story, change the props in Controls, then view Docs to see the usage and API.</p>
    <div className="cu-story-surface" style={{ gap: 14 }}>
      <div className="cu-story-row"><BookOpen size={17} /><strong>01 · Pick a component / انتخاب کامپوننت</strong></div>
      <div className="cu-story-row"><MousePointerClick size={17} /><strong>02 · Change its Controls / تغییر ویژگی‌ها</strong></div>
      <div className="cu-story-row"><Settings2 size={17} /><strong>03 · Explore states and Docs / بررسی حالت‌ها و مستندات</strong></div>
    </div>
    <p style={{ fontSize: 12 }}>The toolbar also switches Light/Dark and English/فارسی direction. Controlled input values update as you type or click.</p>
    <div className="cu-story-row"><span style={{ fontSize: 12, fontWeight: 700 }}>START WITH ACTIONS / BUTTON</span><ArrowRight size={17} /></div>
  </div>;
}

const meta = {
  title: '00 Start here/Welcome',
  component: Guide,
  tags: ['autodocs'],
  parameters: { controls: { disable: true }, layout: 'centered' }
} satisfies Meta<typeof Guide>;

export default meta;
type Story = StoryObj<typeof meta>;
export const QuickStart: Story = {};
