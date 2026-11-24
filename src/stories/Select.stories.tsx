import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Select } from '../components/ui/Select';
const meta = {
  title: '02 Forms/Select', component: Select, tags: ['autodocs'],
  args: { label: 'Your team', options: [{ label: 'Design', value: 'design' }, { label: 'Engineering', value: 'engineering' }, { label: 'Product', value: 'product' }], value: 'design', disabled: false, required: false, name: 'team', title: '' },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    options: { control: 'object', description: 'Array of { label, value }', table: { category: 'Content' } },
    value: { control: 'text', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    required: { control: 'boolean', table: { category: 'Validation' } },
    name: { control: 'text', table: { category: 'Behavior' } },
    title: { control: 'text', table: { category: 'Accessibility' } },
    onChange: { control: false }, className: { control: false }, style: { control: false }
  },
  render: (args) => { const [, updateArgs] = useArgs(); return <div className="cu-story-surface"><Select {...args} onChange={(event) => updateArgs({ value: event.target.value })} /></div>; }
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Required: Story = { args: { required: true } };
