export default {
  setupFilesAfterEnv: ["<rootDir>src/setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};
