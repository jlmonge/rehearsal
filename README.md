# Rehearsal
Rehearsal lets you create, configure, and run through an ordered list of tasks, resetting to step 1 at the each of end day.

## Features
### Rehearsal
The Rehearsal, the namesake of this app, is a list of tasks. In addition to this list, users can also customize the title of the Rehearsal and the settings.

### Rehearsal Settings
Each Rehearsal has customizable settings, where one can set
- days of the week it is active (via a custom day of week picker component),
- whether its original order should always be respected, or if the tasks should randomize whenever they reset

### 

### Saving
A lot of data pertaining to a Rehearsal is saved to the user's local storage, such as 
- tasks,
- new task input,
- settings,
- title,
- completion status,
- current task number, and
- date last opened

## [Design](https://www.figma.com/design/XnkN5eviVXYSiaNYMqR2qO/rehearsal-(comprehensive)?node-id=0-1&t=YlwGlf7EkEtgpBsd-1)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
