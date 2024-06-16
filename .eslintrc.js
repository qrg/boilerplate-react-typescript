const plugins = ['import', 'promise', 'jsx-a11y', 'react-refresh']
const pluginsTs = [...plugins, '@typescript-eslint']

const configs = [
  'eslint:recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:promise/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
  'airbnb',
  'airbnb/hooks',
]
const configsTs = [
  ...configs,
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'airbnb-typescript',
]

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 2024,
  sourceType: 'module',
}

const rules = {
  // off
  'import/prefer-default-export': 'off',
  'react/prop-types': 'off',

  // Introducing the New JSX Transform – React Blog
  // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',

  // warn
  'no-console': 'warn',
  'prefer-template': 'warn',
  'react-refresh/only-export-components': 'warn',

  // error
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-arrow-callback': 'error',
  camelcase: 'warn',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  'react/function-component-definition': [
    'error',
    { namedComponents: 'arrow-function' },
  ],
  'jsx-a11y/anchor-is-valid': [
    'error',
    {
      components: ['Link'],
      aspects: ['invalidHref', 'preferButton'],
    },
  ],
}

const rulesTs = {
  ...rules,
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error'],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
}

module.exports = {
  root: true,
  plugins,
  extends: [...configs, 'prettier'],
  parserOptions,
  settings: {
    react: {
      version: 'detect',
    },
    node: {
      resolvePaths: ['node_modules/@types'],
      tryExtensions: ['.js', '.json', '.node', '.jsx', '.ts', '.tsx', '.d.ts'],
    },
  },
  rules,
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        node: true,
        browser: false,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        node: true,
        browser: false,
      },
      plugins: pluginsTs,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...parserOptions,
        project: ['./tsconfig.json', './tsconfig.node.json'],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      extends: [...configsTs, 'prettier'],
      rules: rulesTs,
    },
    {
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      env: {
        node: false,
        browser: true,
      },
    },
  ],
}
