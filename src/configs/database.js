const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clothes-web-shop', 'root', null, { host: 'localhost', dialect: 'mysql', logging: false });
//, logging: false

module.exports = {
    sequelize,
    connect: async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await sequelize.sync();
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
}