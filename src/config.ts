import { config } from 'dotenv'
config()

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_DB: process.env.DATABASE_DB,
  DATABASE_DB_TEST: process.env.DATABASE_DB_TEST,
  USER_DB: process.env.USER_DB,
  PORT_DB: process.env.PORT_DB || 5432,
  HOST_DB: process.env.HOST_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET_JWT,
}
