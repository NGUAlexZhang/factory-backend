const Sequelize=require('sequelize')
const sequelize=require('../connect')
let customers = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING(30),
    birth: Sequelize.DATE,
    sex:Sequelize.BOOLEAN
}, {
    timestamps: false
})
module.exports=customers