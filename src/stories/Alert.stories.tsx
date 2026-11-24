import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/ui/Alert';
const meta = {
  title: '04 Feedback/Alert', component: Alert, tags: ['autodocs'],
  args: { tone: 'info', title: 'A quick heads up', children: 'The system will save your changes automatically.' },
  argTypes: {
    tone: { control: 'select', options: ['info','success','warning','danger'], table: { category: 'Appearance' } },
    title: { control: 'text', table: { category: 'Content' } },
    children: { control: 'text', table: { category: 'Content' } }
  },
  render: (args) => <div className="cu-story-surface"><Alert {...args} /></div>
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Success: Story = { args: { tone: 'success', title: 'Saved', children: 'Changes saved successfully.' } };
export const Warning: Story = { args: { tone: 'warning', title: 'Attention required' } };
export const Danger: Story = { args: { tone: 'danger', title: 'Something went wrong' } };
