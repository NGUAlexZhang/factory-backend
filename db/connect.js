const Sequelize = require("sequelize");
let sequelize = new Sequelize('factory', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
module.exports=sequelize