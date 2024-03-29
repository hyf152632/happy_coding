module.exports = (api) => {
  // const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      "@babel/preset-react",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@src": "./src",
            "@test": "./test",
          },
        },
      ],
    ],
  };
};
