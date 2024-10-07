const { Sequelize } = require('sequelize');

// Configurer les variables d'environnement dans un fichier .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Pour éviter les logs des requêtes SQL dans la console
});

module.exports = sequelize;
