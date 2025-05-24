module.exports = {
  // preset: 'ts-jest',
transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Use ts-jest to transform TypeScript and JavaScript files
},
  testEnvironment: 'node', // Specifies the test environment
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensions Jest will look for
  rootDir: '.', // Sets the root directory for Jest to the project root
  testRegex: '.spec.ts$', // Pattern for Jest to find test files (any .spec.ts file)
  collectCoverageFrom: ['src/**/*.(t|j)s'], // Specifies files to collect coverage from
  coverageDirectory: './coverage', // Directory where coverage reports will be saved
    moduleNameMapper: {
},
};