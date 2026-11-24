import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Switch } from '../components/ui/Switch';
const meta = {
  title: '02 Forms/Switch', component: Switch, tags: ['autodocs'],
  args: { checked: true, label: 'Enable notifications', description: 'Receive important product updates', disabled: false, onChange: () => undefined },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    checked: { control: 'boolean', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    onChange: { control: false, description: 'Invoked with the new checked boolean' }
  },
  render: (args) => { const [, updateArgs] = useArgs(); return <Switch {...args} onChange={(checked) => updateArgs({ checked })} />; }
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Off: Story = { args: { checked: false } };
export const Disabled: Story = { args: { disabled: true } };
