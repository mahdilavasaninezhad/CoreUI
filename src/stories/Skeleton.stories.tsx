import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '../components/ui/Skeleton';
const meta = {
  title: '04 Feedback/Skeleton', component: Skeleton, tags: ['autodocs'],
  args: { width: '240px', height: 18, round: false },
  argTypes: {
    width: { control: 'text', description: 'CSS size such as 240px, 50%, 12rem', table: { category: 'Dimensions' } },
    height: { control: { type: 'range', min: 4, max: 160, step: 2 }, table: { category: 'Dimensions' } },
    round: { control: 'boolean', table: { category: 'Appearance' } }
  },
  render: (args) => <div className="cu-story-surface"><Skeleton {...args} /></div>
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const AvatarLoading: Story = { args: { width: '64px', height: 64, round: true } };
export const ContentLoading: Story = { render: (args) => <div className="cu-story-surface"><Skeleton {...args} /><Skeleton width="100%" height={12} /><Skeleton width="76%" height={12} /></div> };
