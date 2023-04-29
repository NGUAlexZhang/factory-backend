const staff = require('../db/moels/staff.js')
const {Op} = require('sequelize')
const addStaff = async (name, join_date, sex,attend) => {
    try {
        await staff.create({
            name, join_date, sex,attend
        })
    } catch (e) {
        return Promise.reject(e)
    }
}
const getStaff = async (name, id, order, by, page, size, count) => {
    // console.log(page, size)
    try {
        const res = await staff.findAll({
            order: [
                [by, order]
            ],
            offset: (page - 1) * size,
            limit: Math.min(count - (page - 1) * size, size),
            where: {
                name: {
                    [Op.substring]: name
                },
                id: {
                    [Op.substring]: id
                }
            }
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
const getCount = async (name, id) => {
    try {
        const res = await staff.count({
            where: {
                name: {
                    [Op.substring]: name
                },
                id: {
                    [Op.substring]: id
                }
            }
        })
        return Promise.resolve(res)
    } catch (err) {

        return Promise.reject(err)
    }
}
const deleteStaff = async (id) => {
    try {
        const res = await staff.destroy({
            where: {
                id
            }
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
const putStaff= async (id, name, join_date, sex,attend) => {
    try {
        await staff.update({name, join_date, sex,attend}, {
            where: {
                id
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
module.exports = {addStaff, getStaff, getCount, deleteStaff, putStaff}