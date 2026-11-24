import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/ui/Card';
const meta = {
  title: '03 Display/Card', component: Card, tags: ['autodocs'],
  args: { children: 'A flexible surface for related content.', title: 'Project overview', role: 'region', className: '' },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    title: { control: 'text', table: { category: 'Accessibility' } },
    role: { control: 'text', table: { category: 'Accessibility' } },
    className: { control: 'text', description: 'Additional CSS class for consumer customization', table: { category: 'Appearance' } },
    style: { control: false }
  },
  render: (args) => <div className="cu-story-surface"><Card {...args} /></div>
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const RichContent: Story = { render: (args) => <div className="cu-story-surface"><Card {...args}><h3>Product release</h3><p>Track updates and keep your team aligned.</p></Card></div> };
