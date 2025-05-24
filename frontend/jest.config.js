/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for global test setup
    moduleNameMapper: {
      // Handle CSS imports (if you import CSS in components)
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Handle module path aliases if you have them in tsconfig.json
      // Example: '^@/components/(.*)$': '<rootDir>/components/$1',
    },
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', {
        tsconfig: 'tsconfig.json', // Or your specific tsconfig for tests if different
        // You can add specific ts-jest options here if needed, e.g., for JSX:
        // isolatedModules: true, // Can sometimes help with transform speed/issues
        // jsx: 'react-jsx', // Or 'react', depending on your tsconfig
      }],
      // If you have .js files that need Babel transformation (e.g. from node_modules or plain JS in your project)
      // you might need babel-jest configured here as well.
      // Example: '^.+\\.(js|jsx)$': 'babel-jest',
    },
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    // Explicitly include test files from __tests__ directory
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    // Or, if you prefer roots:
    // roots: [
    //   "<rootDir>/__tests__",
    //   "<rootDir>/redux" // if you have tests there too
    // ],
};  