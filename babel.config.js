module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@queries': './src/queries',
          '@services': './src/services',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@interfaces': './src/interfaces',
          '@config': './src/config',
          '@store': './src/store',
          '@screens': './src/screens',
          '@localization': './src/localization/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
