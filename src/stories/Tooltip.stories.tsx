import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../components/ui/Tooltip';
import { Button } from '../components/ui/Button';
const meta = {
  title: '04 Feedback/Tooltip', component: Tooltip, tags: ['autodocs'],
  args: { label: 'Helpful context appears here', children: 'Hover or focus this element' },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    children: { control: 'text', table: { category: 'Content' } }
  }
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const WithButton: Story = { render: (args) => <Tooltip label={args.label}><Button variant="outline">Focus to see tooltip</Button></Tooltip> };
