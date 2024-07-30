// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require("path");
const getGlobals = require("./jest.globals");
module.exports = {
  displayName: "E2E Tests",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The root directory that Jest should scan for tests and modules within
  rootDir: "../../../",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src/", "<rootDir>/test/cases/"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Ensure the testMatch pattern is correct
  testMatch: [`**/${process.env.MATCH || ""}?(*.)+(spec.e2e|e2e.test|test.e2e).[jt]s?(x)`],

  globals: getGlobals(),

  globalSetup: path.join(__dirname, "jest.setup.js")
};