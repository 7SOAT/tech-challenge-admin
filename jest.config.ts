/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/api/config/swagger/product'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/../src/api/$1',
    '^@routes/(.*)$': '<rootDir>/../src/api/routes/$1',
    '^@gateways/(.*)$': '<rootDir>/../src/adapters/gateways/$1',
    '^@usecases/(.*)$': '<rootDir>/../src/core/usecases/$1',
    '^@entities/(.*)$': '<rootDir>/../src/core/entities/$1',
    '^@enums/(.*)$': '<rootDir>/../src/core/enums/$1',
    '^@interfaces/(.*)$': '<rootDir>/../src/package/interfaces/$1',
    '^@type/(.*)$': '<rootDir>/../src/core/types/$1',
    '^@datasource/(.*)$': '<rootDir>/../src/externals/datasource/$1',
    '^@providers/(.*)$': '<rootDir>/../src/externals/providers/$1',
    '^@config/(.*)$': '<rootDir>/../src/api/config/$1',
    '^@models/(.*)$': '<rootDir>/../src/package/models/$1',
    '^@repositories/(.*)$': '<rootDir>/../src/externals/datasource/typeorm/repositories/$1',
  },
};

module.exports = config;
