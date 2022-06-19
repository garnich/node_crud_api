module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*__test__.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};