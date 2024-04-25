export default {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: ['/src/modules/.*\\.test?\\.ts$', '/test/.*\\.test\\.ts'],
  moduleFileExtensions: ['ts', 'js'],
};