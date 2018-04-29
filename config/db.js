const Sequelize = require('sequelize');
const username = process.env.USERNAME || 'user'
const password = process.env.PASSWORD || 'test'
const host = process.env.HOST || 'localhost'
const database_name = process.env.DB_NAME || 'daily-inventory'

const sequelize = new Sequelize(database_name, username, password, {
  host: host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 20000
  }
});

module.exports = sequelize;