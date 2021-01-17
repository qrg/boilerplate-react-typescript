const plugins = ['import', 'promise', 'jsx-a11y']
const pluginsTs = [...plugins, '@typescript-eslint']

const configs = [
  'eslint:recommended',
  'standard',
  'prettier',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:promise/recommended',
  'plugin:node/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
]
const configsTs = [
  ...configs,
  'plugin:import/typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
]

const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 2021,
  sourceType: 'module',
}

const rules = {
  'no-console': 'warn',
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'warn',
  'prefer-arrow-callback': 'error',
  camelcase: 'warn',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  'react/prop-types': 'off',

  // Introducing the New JSX Transform – React Blog
  // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',

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
  'node/no-unsupported-features/es-syntax': [
    'error',
    {
      ignores: ['modules'],
    },
  ],
  'node/no-unpublished-import': [
    'error',
    {
      tryExtensions: ['.js', '.json', '.node', '.jsx', '.ts', '.tsx', '.d.ts'],
    },
  ],
}

module.exports = {
  root: true,
  plugins,
  extends: configs,
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
      files: ['./webpack.config.js'],
      rules: {
        ...rules,
        'node/no-unpublished-require': [
          'error',
          {
            allowModules: [
              'webpack',
              'clean-webpack-plugin',
              'html-webpack-plugin',
              '@pmmmwh/react-refresh-webpack-plugin',
            ],
          },
        ],
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
        project: './tsconfig.json',
      },
      extends: configsTs,
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
