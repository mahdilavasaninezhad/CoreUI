import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../components/ui/Tag';
import { useArgs } from 'storybook/preview-api';
type DemoArgs = { children: string; removeLabel: string; removable: boolean };
function TagDemo({ children, removeLabel, removable }: DemoArgs) {
  return <Tag removeLabel={removeLabel} onRemove={removable ? () => undefined : undefined}>{children}</Tag>;
}
const meta = {
  title: '03 Display/Tag', component: TagDemo, tags: ['autodocs'],
  args: { children: 'TypeScript', removeLabel: 'Remove', removable: true },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <Tag removeLabel={args.removeLabel} onRemove={args.removable ? () => updateArgs({ removable: false }) : undefined}>{args.children}</Tag>;
  },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    removeLabel: { control: 'text', table: { category: 'Accessibility' } },
    removable: { control: 'boolean', description: 'Whether the onRemove callback is provided', table: { category: 'Behavior' } }
  }
} satisfies Meta<typeof TagDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Static: Story = { args: { removable: false } };
