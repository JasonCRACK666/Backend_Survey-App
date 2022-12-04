import type { Config } from 'jest'

const config: Config = {
  testMatch: ['**/test/**/*.test.ts'],
  testEnvironment: 'node',
}

export default config
