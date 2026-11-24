import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox } from '../components/ui/Checkbox';
const meta = {
  title: '02 Forms/Checkbox', component: Checkbox, tags: ['autodocs'],
  args: { checked: true, label: 'Remember my preferences', description: 'Keep this setting for future sessions', disabled: false, onChange: () => undefined },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    checked: { control: 'boolean', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    onChange: { control: false, description: 'Invoked with the new checked boolean' }
  },
  render: (args) => { const [, updateArgs] = useArgs(); return <Checkbox {...args} onChange={(checked) => updateArgs({ checked })} />; }
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Unchecked: Story = { args: { checked: false } };
export const Disabled: Story = { args: { disabled: true } };
