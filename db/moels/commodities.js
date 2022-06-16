const Sequelize = require('sequelize')
const sequelize = require('../connect')
let commodities = sequelize.define('commodities', {
    name: {type:Sequelize.STRING(50),primaryKey:true},
    price: Sequelize.FLOAT,
    updated_at: Sequelize.DATE,
    created_at: Sequelize.DATE

}, {
    timestamps: false
})
module.exports = commodities