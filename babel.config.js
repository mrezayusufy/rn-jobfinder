module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: [ "babel-preset-expo", "module:metro-react-native-babel-preset" ],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env",
          "safe": false,
          "allowUndefined": true,
          "verbose": false,
        },
      ],
      require.resolve("expo-router/babel"),
    ],
  };
};
