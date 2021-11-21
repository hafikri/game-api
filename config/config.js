require('dotenv').config()

const {DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT} = process.env

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres",
    "port": DB_PORT
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres",
    "port": DB_PORT
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres",
    "port": DB_PORT
  }
}
