module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
