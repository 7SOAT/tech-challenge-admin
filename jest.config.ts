/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '\.module\.ts$',
    '\.dto\.ts$',
    '\.repository\.ts$',
    '\.data-source\.ts$',
    '\.seed\.ts$',
    '\.swagger\.ts$',
    '\.model\.ts$',
    '\.provider\.ts$',
    '\.mock\.ts$',
    'src/api/config/',
    'src/bootstrap.ts',
    'src/main.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

module.exports = config;
