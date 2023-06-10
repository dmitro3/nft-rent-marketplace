const winston = require('winston');
require('winston-mongodb');
const env = require('../config/env')

const db = `mongodb+srv://${env.mongoUserName}:${env.mongoPwd}@${env.mongoUri}`
const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      db,
      dbName: 'logs',
      collection: 'rents',
      level: 'info',
    }),
  ],
});

module.exports = logger;