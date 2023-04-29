const Sequelize=require('sequelize')
const sequelize=require('../connect')
let staff = sequelize.define('staffs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING(50),
    join_date: Sequelize.DATE,
    sex:Sequelize.BOOLEAN,
    attend:Sequelize.FLOAT
}, {
    timestamps: false
})
module.exports=staff