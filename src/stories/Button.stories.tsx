import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from '../components/ui/Button';
import { Button } from '../components/ui/Button';
import { ArrowRight, Download, Plus, Search, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonDemoProps = ButtonProps & { startIcon: string; endIcon: string };
const icons: Record<string, ReactNode> = { None: null, Plus: <Plus size={17} />, Arrow: <ArrowRight size={17} />, Search: <Search size={17} />, Download: <Download size={17} />, Sparkles: <Sparkles size={17} /> };
const meta = {
  title: '01 Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'A flexible action with variants, sizes, states, icons and native button attributes. Change any control to see the result immediately.' } } },
  args: { children: 'Create project', variant: 'solid', size: 'md', loading: false, disabled: false, fullWidth: false, type: 'button', title: '', startIcon: 'None', endIcon: 'Arrow' },
  argTypes: {
    children: { name: 'Label', control: 'text', table: { category: 'Content' } },
    startIcon: { control: 'select', options: Object.keys(icons), table: { category: 'Content' } },
    endIcon: { control: 'select', options: Object.keys(icons), table: { category: 'Content' } },
    variant: { control: 'select', options: ['solid', 'outline', 'soft', 'ghost'], table: { category: 'Appearance' } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], table: { category: 'Appearance' } },
    fullWidth: { control: 'boolean', table: { category: 'Appearance' } },
    loading: { control: 'boolean', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    type: { control: 'select', options: ['button', 'submit', 'reset'], table: { category: 'Behavior' } },
    title: { control: 'text', table: { category: 'Accessibility' } },
    leadingIcon: { control: false, table: { disable: true } },
    trailingIcon: { control: false, table: { disable: true } },
    onClick: { control: false, table: { category: 'Events' } },
    className: { control: false },
    style: { control: false }
  },
  render: ({ startIcon, endIcon, ...args }) => <Button {...args} leadingIcon={icons[startIcon]} trailingIcon={icons[endIcon]} />
} satisfies Meta<ButtonDemoProps>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = { render: (args) => <div className="cu-story-row">{(['solid', 'outline', 'soft', 'ghost'] as const).map((variant) => <Button key={variant} {...args} variant={variant} />)}</div> };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = { args: { fullWidth: true } };
