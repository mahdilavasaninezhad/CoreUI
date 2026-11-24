import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/ui/Badge';
const meta = {
  title: '03 Display/Badge', component: Badge, tags: ['autodocs'],
  args: { children: 'Active', tone: 'success', dot: true, title: '' },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    tone: { control: 'select', options: ['neutral', 'brand', 'success', 'warning', 'info', 'danger'], table: { category: 'Appearance' } },
    dot: { control: 'boolean', table: { category: 'Appearance' } },
    title: { control: 'text', table: { category: 'Accessibility' } },
    className: { control: false }, style: { control: false }
  }
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const AllTones: Story = { render: (args) => <div className="cu-story-row">{(['neutral','brand','success','warning','info','danger'] as const).map((tone) => <Badge key={tone} {...args} tone={tone}>{tone}</Badge>)}</div> };
export const WithoutDot: Story = { args: { dot: false } };
