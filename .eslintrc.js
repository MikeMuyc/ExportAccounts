process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  root: true,
  extends: '@nuofe/eslint-config-react',
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  globals: {
    ClientAPI: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require('@nuofe/ndk-builder').default.getResolveConfig(),
      },
    },
  },
};
