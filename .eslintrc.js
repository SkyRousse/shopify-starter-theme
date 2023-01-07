module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/prettier'],
  plugins: ['prettier'],
  globals: {
    document: true,
    jQuery: true,
    $: true,
    theme: true,
    Shopify: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': 'warn',
    'import/no-unresolved': [2, { caseSensitive: false }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['LAYOUT', './source/scripts/layout'],
          ['SECTIONS', './source/scripts/sections'],
          ['TEMPLATES', './source/scripts/templates'],
          ['UTILS', './source/scripts/utilities'],
          ['UTILITIES', './source/scripts/utilities'],
          ['COMPONENTS', './source/scripts/components'],
          ['ACCESSIBILITY', './source/scripts/utilities/accessibility'],
          ['CUSTOMERS', './source/scripts/utilities/customers'],
          ['DOM', './source/scripts/utilities/DOM'],
          ['WINDOW', './source/scripts/utilities/window'],
          ['FETCH', './source/scripts/utilities/fetch'],
          ['STYLES', './source/styles'],
        ],
      },
    },
  },
};
