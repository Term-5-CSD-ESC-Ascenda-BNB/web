# Hotel Web App

## 🚀 Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Start the dev server

```sh
npm run dev
```

## 🧩 Recommended VS Code Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — Shows lint errors and warnings in your editor.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — Automatically formats code on save.

With these extensions and the shared workspace settings, your code will be automatically formatted and linted as you work.

## 🚦 Committing Code & lint-staged

We use **lint-staged** to check and auto-fix code style and lint errors on staged files before each commit.

If you try to commit code that doesn’t pass ESLint, the commit will fail and you’ll see an error log. After fixing the reported issues, try staging the changes and commit again.

It may be a bit troublesome, but ultimately it helps keep our codebase clean and consistent for everyone.

## 💡 Notes

- **Styling:** Use CSS Modules for component styles.
- **Contributing:** Please use clear commit messages (e.g., `feat: add search bar`, `fix: correct image loading`).
- **Branching:** Use feature branches (e.g. `feature/search-bar`).

## 📝 Useful Scripts

| Script            | What it does                            |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start development server                |
| `npm run preview` | Preview production build                |
| `npm run test`    | Runs relevant unit tests on file change |
| `npm run lint`    | Lints all .ts and .tsx files            |

## 📂 Project Structure

- `src/routes/` — App routes (pages)
- `src/components/` — Reusable UI components (e.g., CarouselCard)
- `src/types/` — TypeScript type definitions

## 🛠️ Stack

- **React** + **TypeScript**
- **Vite** for fast builds and HMR
- **Mantine** for UI components
- **TanStack Router** for routing
- **TanStack Query** + **Axios** for data fetching/caching
- **React Virtuoso** for virtualized lists
- **ESLint** + **Prettier** for code quality and formatting
- **Vitest** +**RTL** for unit and integration testing

---
