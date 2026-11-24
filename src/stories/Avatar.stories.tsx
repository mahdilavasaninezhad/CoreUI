import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../components/ui/Avatar';
const meta = {
  title: '03 Display/Avatar', component: Avatar, tags: ['autodocs'],
  args: { name: 'Alex Morgan', size: 'md', color: '#d8d1fb' },
  argTypes: {
    name: { control: 'text', table: { category: 'Content' } },
    size: { control: 'inline-radio', options: ['sm','md','lg'], table: { category: 'Appearance' } },
    color: { control: 'color', table: { category: 'Appearance' } }
  }
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Sizes: Story = { render: (args) => <div className="cu-story-row">{(['sm','md','lg'] as const).map((size) => <Avatar key={size} {...args} size={size} />)}</div> };
