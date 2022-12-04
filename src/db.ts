import { Pool } from 'pg'
import config from './config'

const pool = new Pool({
  database:
    config.NODE_ENV === 'test' ? config.DATABASE_DB_TEST : config.DATABASE_DB,
  user: config.USER_DB,
  port: 5432,
  host: config.HOST_DB,
  password: config.PASSWORD_DB,
})

export default pool
