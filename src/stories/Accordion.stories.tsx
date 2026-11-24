import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '../components/ui/Accordion';
const meta = {
  title: '03 Display/Accordion', component: Accordion, tags: ['autodocs'],
  args: { items: [
    { title: 'How does installation work?', content: 'Install the package and import the component you need.' },
    { title: 'Can I customize the theme?', content: 'Yes. Every component uses shared CSS design tokens.' },
    { title: 'Is keyboard navigation supported?', content: 'The native details control supports keyboard interaction.' }
  ] },
  argTypes: { items: { control: 'object', description: 'Editable array of title/content records', table: { category: 'Content' } } },
  render: (args) => <div className="cu-story-surface"><Accordion {...args} /></div>
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const OneItem: Story = { args: { items: [{ title: 'Single item', content: 'This is a short answer.' }] } };
