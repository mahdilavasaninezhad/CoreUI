import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, Checkbox, Dialog, Progress, Switch, Tabs, TextField } from '../components/ui';

describe('CoreUI components', () => {
  it('invokes the button action and respects disabled state', () => {
    const handleClick = vi.fn();
    const { rerender } = render(<Button onClick={handleClick}>Continue</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
    rerender(<Button onClick={handleClick} disabled>Continue</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('marks invalid text fields with an accessible error', () => {
    render(<TextField label="Email" error="Invalid email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('supports a controlled checkbox', () => {
    const change = vi.fn();
    render(<Checkbox checked={false} onChange={change} label="Updates" />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Updates' }));
    expect(change).toHaveBeenCalledWith(true);
  });

  it('supports an accessible switch', () => {
    const change = vi.fn();
    render(<Switch checked={true} onChange={change} label="Notifications" />);
    fireEvent.click(screen.getByRole('switch', { name: 'Notifications' }));
    expect(change).toHaveBeenCalledWith(false);
  });

  it('shows the selected tab content', () => {
    const change = vi.fn();
    render(<Tabs value="a" onChange={change} items={[{ id: 'a', label: 'Overview', content: 'First panel' }, { id: 'b', label: 'Activity', content: 'Second panel' }]} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(change).toHaveBeenCalledWith('b');
  });

  it('clamps progress values', () => {
    render(<Progress value={150} max={100} label="Setup" />);
    expect(screen.getByRole('progressbar', { name: 'Setup' })).toHaveAttribute('aria-valuenow', '100');
  });

  it('closes the dialog on escape', () => {
    const close = vi.fn();
    render(<Dialog open title="Create workspace" onClose={close}><Button>Save</Button></Dialog>);
    expect(screen.getByRole('dialog', { name: 'Create workspace' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(close).toHaveBeenCalledTimes(1);
  });
});
