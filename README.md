# CoreUI

An independent React design system studio with expressive visual design, 17 reusable TypeScript components, interactive documentation, a six-component live customization lab, full Storybook stories, and unit tests.

This is an independent portfolio project, not affiliated with the similarly named commercial CoreUI product. The refreshed visual experience is called the Studio Edition; the package version remains 2.0.0 to preserve compatibility with existing npm lockfiles.

## Tech stack

- React 19
- TypeScript
- Vite 7
- Storybook 10
- Vitest 4 and React Testing Library
- Lucide icons
- Plain CSS custom properties

## Requirements

Node.js 22 or newer and npm.

## Run the documentation website

```bash
npm install
npm run dev
```

Vite prints the local address, usually `http://localhost:5173/CoreUI/` because the project uses `/CoreUI/` as the GitHub Pages base path.

## Verify the project

```bash
npm run typecheck
npm run test
npm run build
```

## Storybook

```bash
npm run storybook
```

Storybook opens on port 6006. To generate the static Storybook documentation:

```bash
npm run build-storybook
```

## Reuse components in another project

The component implementations are in `src/components/ui` and are re-exported by `src/index.ts`. Copy the relevant components or extract them into a package and load `src/styles/tokens.css` and `src/styles/components.css` in your app.

Example:

```tsx
import { Button, TextField, Switch } from './components/ui';

export function Example() {
  return <Button variant="solid" size="lg">Create project</Button>;
}
```

The UI primitives do not require a server. Locale and theme in the documentation website persist to local storage. Playground interactions, onboarding, and notifications are intentionally local demos.

## Studio Edition

The site offers a clear route: start on the editorial home page, discover a component in the searchable catalog, customize it in the live laboratory, then continue to the full Storybook Controls and Docs. The in-site lab covers Button, Badge, TextField, Switch, Alert and Progress; Storybook provides dedicated interactive stories for all 17 component families.

The UI supports light/dark themes, English/Persian RTL/LTR, a keyboard-first command search (`Ctrl+K` or `⌘K`), reduced-motion preferences and responsive layouts. Theme and language settings persist locally.

The hero preview and the component lab are browser-side demonstrations. They do not create a backend workspace or persist form submissions.

## Project map

| Location | Purpose |
| --- | --- |
| `src/components/ui` | Reusable component implementations |
| `src/styles/edition.css` | Studio Edition layout and visual language |
| `src/pages` | Documentation and playground screens |
| `src/data/tokens.ts` | Typed CSS token references |
| `src/data/i18n.ts` | Complete English and Persian UI strings |
| `src/context` | Locale and theme preferences |
| `src/styles/tokens.css` | Light/dark semantic tokens |
| `src/styles/components.css` | Reusable component styles |
| `src/styles/studio.css` | Editorial documentation site styles |
| `src/stories` | Storybook component examples |
| `src/test` | Unit and interaction tests |
| `.github/workflows/deploy.yml` | GitHub Pages workflow |

## GitHub Pages

Create a public repository named `CoreUI`. Push this project to the `main` branch. In GitHub repository Settings → Pages, set Build and deployment Source to GitHub Actions. The workflow installs dependencies with npm, typechecks, runs tests, builds the documentation website and Storybook, combines both static outputs, and deploys the `dist` directory.

Your anticipated URL is:

`https://mahdilavasaninezhad.github.io/CoreUI/`

The Storybook component lab is served at:

`https://mahdilavasaninezhad.github.io/CoreUI/storybook/`

If the repository is renamed, change `base` in `vite.config.ts` and the favicon path in `index.html` to match.

## Design and accessibility

The documentation is responsive, bilingual (English and Persian with RTL/LTR), and supports light and dark themes. Buttons, text fields, switches, checkboxes, tabs, dialog, toasts, and progress indicators include accessible semantics and keyboard support. Accessibility needs real-device and screen-reader testing before production adoption.

## Limitations

This is a frontend design system and demonstration site. It does not include authentication, backend storage, published npm packages, or a guarantee of production accessibility compliance. The reusable components are intended to be reviewed and extended before use in production.

## CoreUI Studio Edition — Getting started

The Studio Edition landing page, live specimen and searchable catalog are organized around three decisions: **Find a component**, **Try and customize**, and **Implement with confidence**. The component directory now shows a searchable list, one focused live preview, and a copyable usage example. Global search with `Ctrl + K` searches both pages and individual components.

### Storybook: full component controls

Run `npm run storybook`, open `http://localhost:6006`, then select a component in the sidebar. Every exported UI primitive now has a dedicated story, organized into **Actions**, **Forms**, **Display**, and **Feedback**. Start with its **Playground** story and use **Controls** to edit supported component props. The **Docs** page describes the props and provides the examples.

- **Content:** labels, text, descriptions, arrays of options or tabs
- **Appearance:** variants, sizes, tones, badges, avatars, icons and dimensions
- **State and interaction:** loading, disabled, checked, active tab, dialog visibility and field value
- **Accessibility and behavior:** required, ARIA labels, keyboard interactions, native control attributes

Storybook's global toolbars include **Light / Dark** and **English / فارسی** direction previews. This does not automatically translate demo content; the locale control changes page direction and HTML language. The public component API is the limit of each Control; unsupported props are not represented as if they worked.

### Verify changes before publishing

```bash
npm install --legacy-peer-deps
npm run typecheck
npm run test
npm run build
npm run storybook
npm run build-storybook
```

If `npm install` fails, check the local Node.js/npm versions and the npm debug log. Build and Storybook results must be verified locally before deploying.
