export default {
  preset: "ts-jest/presets/default-esm",   // TypeScript + ESM
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // يخلي imports بدون .js تشتغل
  },
  transformIgnorePatterns: [
    "node_modules/(?!(\\.pnpm/)?@faker-js/faker)", 
  ],
};
