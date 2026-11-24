import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Dialog } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
const meta = {
  title: '01 Actions/Dialog', component: Dialog, tags: ['autodocs'],
  args: { open: false, title: 'Create workspace', description: 'Give your new workspace a clear name.', closeLabel: 'Close dialog', children: 'You can put forms or any React content inside a dialog.', onClose: () => undefined },
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    children: { control: 'text', table: { category: 'Content' } },
    closeLabel: { control: 'text', table: { category: 'Accessibility' } },
    onClose: { control: false }
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <><Button onClick={() => updateArgs({ open: true })}>Open dialog</Button><Dialog {...args} onClose={() => updateArgs({ open: false })} /></>;
  }
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const InitiallyOpen: Story = { args: { open: true } };
