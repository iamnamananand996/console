const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest

/** @type {import('jest').Config} */

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/integration-test/", "<rootDir>/.next/"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    // The order is very important, we catch /(.*) path first
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/components": "<rootDir>/src/components",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/utils": "<rootDir>/src/utils",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/types": "<rootDir>/src/types",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/hooks": "<rootDir>/src/hooks",
    "^@/style/(.*)$": "<rootDir>/src/style/$1",
    "^@/style": "<rootDir>/src/style",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/services": "<rootDir>/src/services",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/lib": "<rootDir>/src/lib",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/pages": "<rootDir>/src/pages",
    "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@/mocks": "<rootDir>/src/mocks",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@/contexts": "<rootDir>/src/contexts",
    "react-markdown": "<rootDir>/src/lib/test/react-markdown.jsx",
    "remark-frontmatter": "<rootDir>/src/lib/test/remark-frontmatter.js",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
