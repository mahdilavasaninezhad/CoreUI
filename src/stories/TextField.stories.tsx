import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Mail, Search, User } from 'lucide-react';
import { TextField } from '../components/ui/TextField';
import type { TextFieldProps } from '../components/ui/TextField';
type Demo = TextFieldProps & { icon: string };
const meta = {
  title: '02 Forms/TextField', component: TextField, tags: ['autodocs'],
  args: { label: 'Work email', placeholder: 'name@company.com', type: 'email', value: '', hint: 'We will never share your email', error: '', required: false, disabled: false, readOnly: false, autoComplete: 'off', maxLength: 100, icon: 'Mail' },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    hint: { control: 'text', table: { category: 'Content' } },
    error: { control: 'text', table: { category: 'Validation' } },
    value: { control: 'text', table: { category: 'Content' } },
    type: { control: 'select', options: ['text','email','password','search','number','tel','url'], table: { category: 'Behavior' } },
    icon: { control: 'inline-radio', options: ['None','Mail','Search','User'], table: { category: 'Appearance' } },
    required: { control: 'boolean', table: { category: 'Validation' } },
    maxLength: { control: { type: 'number', min: 1, max: 256 }, table: { category: 'Validation' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    readOnly: { control: 'boolean', table: { category: 'State' } },
    autoComplete: { control: 'select', options: ['off','on','email','name','username','current-password'], table: { category: 'Behavior' } },
    onChange: { control: false }, prefix: { control: false }, className: { control: false }, style: { control: false }
  },
  render: ({ icon, ...args }) => {
    const [, updateArgs] = useArgs();
    const prefix = icon === 'Mail' ? <Mail size={17} /> : icon === 'Search' ? <Search size={17} /> : icon === 'User' ? <User size={17} /> : null;
    return <div className="cu-story-surface"><TextField {...args} prefix={prefix} onChange={(event) => updateArgs({ value: event.target.value })} /></div>;
  }
} satisfies Meta<Demo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {
  args: {
    maxLength: 100,
    disabled: false
  }
};
export const Error: Story = { args: { error: 'Please provide a valid address', value: 'invalid', hint: '' } };
export const Password: Story = { args: { label: 'Password', type: 'password', icon: 'None', placeholder: 'Enter your password' } };
export const Disabled: Story = { args: { disabled: true, value: 'Disabled field' } };
