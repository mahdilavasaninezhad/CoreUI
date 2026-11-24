import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tabs } from '../components/ui/Tabs';
const meta = {
  title: '01 Actions/Tabs', component: Tabs, tags: ['autodocs'],
  args: { value: 'overview', ariaLabel: 'Project views', items: [
    { id: 'overview', label: 'Overview', content: 'Summary, milestones and latest updates.' },
    { id: 'activity', label: 'Activity', content: 'Recent team activity appears here.' },
    { id: 'settings', label: 'Settings', content: 'Manage project preferences.' }
  ], onChange: () => undefined },
  argTypes: {
    value: { control: 'select', options: ['overview','activity','settings'], table: { category: 'State' } },
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    items: { control: 'object', description: 'Editable array of tabs, each with id, label and content.', table: { category: 'Content' } },
    onChange: { control: false }
  },
  render: (args) => { const [, updateArgs] = useArgs(); return <div className="cu-story-surface"><Tabs {...args} onChange={(value) => updateArgs({ value })} /></div>; }
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Activity: Story = { args: { value: 'activity' } };
