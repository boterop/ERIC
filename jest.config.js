export default {
  preset: "jest-expo",
  setupFiles: ["./__tests__/test_helper.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@fortawesome|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["{app,components,hooks}/**/*.{js,jsx,ts,tsx}"],
  modulePathIgnorePatterns: [
    "__tests__/__mocks__/",
    "__tests__/test_helper.ts",
  ],
};
