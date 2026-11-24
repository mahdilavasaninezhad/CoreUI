import type { Preview } from '@storybook/react-vite';
import { createElement, useEffect } from 'react';
import type { ReactNode } from 'react';
import '../src/styles/tokens.css';
import '../src/styles/components.css';
import './storybook.css';

function Stage({ theme, locale, children }: { theme: 'light' | 'dark'; locale: 'en' | 'fa'; children?: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [theme, locale]);
  return createElement('div', {
    className: 'cu-story-stage',
    'data-theme': theme,
    dir: locale === 'fa' ? 'rtl' : 'ltr',
    lang: locale
  }, children);
}

const preview: Preview = {
  initialGlobals: { theme: 'light', locale: 'en' },
  globalTypes: {
    theme: {
      description: 'Component color theme',
      toolbar: { icon: 'circlehollow', dynamicTitle: true, items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }] }
    },
    locale: {
      description: 'Preview writing direction',
      toolbar: { icon: 'globe', dynamicTitle: true, items: [{ value: 'en', title: 'English' }, { value: 'fa', title: 'فارسی' }] }
    }
  },
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'none' },
    docs: { toc: true },
    backgrounds: { disable: true }
  },
  decorators: [
    (Story, context) => createElement(Stage, {
      theme: context.globals.theme === 'dark' ? 'dark' : 'light',
      locale: context.globals.locale === 'fa' ? 'fa' : 'en'
    }, createElement(Story))
  ]
};

export default preview;
