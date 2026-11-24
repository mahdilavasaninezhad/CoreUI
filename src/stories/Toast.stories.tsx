import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
type DemoArgs = { message: string; kind: 'success' | 'info'; buttonText: string };
function ToastTrigger({ message, kind, buttonText }: DemoArgs) {
  const { notify } = useToast();
  const [count, setCount] = useState(0);
  return <Button onClick={() => { notify(message, kind); setCount((current) => current + 1); }}>{buttonText}{count ? ` (${count})` : ''}</Button>;
}
function ToastDemo(args: DemoArgs) {
  return <ToastProvider><ToastTrigger {...args} /></ToastProvider>;
}
const meta = {
  title: '04 Feedback/Toast', component: ToastDemo, tags: ['autodocs'],
  parameters: { docs: { description: { component: 'A demonstration of ToastProvider and useToast. Customize the message and kind, then trigger the notification.' } } },
  args: { message: 'Your changes have been saved', kind: 'success', buttonText: 'Show toast' },
  argTypes: {
    message: { control: 'text', table: { category: 'Content' } },
    buttonText: { control: 'text', table: { category: 'Content' } },
    kind: { control: 'inline-radio', options: ['success','info'], table: { category: 'Appearance' } }
  }
} satisfies Meta<typeof ToastDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Info: Story = { args: { kind: 'info', message: 'New updates are available' } };
