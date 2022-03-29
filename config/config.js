require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "HEROKU_POSTGRESQL_ORANGE_URL",
    "dialect": "postgres",
    "operatorsAliases": false,
    "protocol": 'postgres',
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
