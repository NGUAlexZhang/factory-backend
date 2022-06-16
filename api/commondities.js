const commodity = require('../db/moels/commodities')
const {Op} = require('sequelize')
const checkName = async (name) => {
    try {
        return await commodity.count({
            where: {
                name
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
const addCommodity = async (name, price) => {
    let now = Date.now()
    try {
        await commodity.create({
            name, price, updated_at: now, created_at: now
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
const getCommodity = async (name, order, by, page, size, siz) => {
    try {
        console.log(name, order, by, page, size)
        const res = await commodity.findAll({
            order: [
                [by, order]
            ],
            offset: (page - 1) * size,
            limit: Math.min(siz - (page - 1) * size, size),
            where: {
                name: {
                    [Op.substring]: name
                }
            }
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
const getCount = async (name) => {
    try {
        return await commodity.count({
            where: {
                name: {
                    [Op.substring]: name
                }
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
const deleteCommodity = async (name) => {
    try {
        await commodity.destroy({
            where: {
                name
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
const putCommodity = async (name, price) => {
    let now = Date.now()
    try {
        await commodity.update({name, price, updated_at: now}, {
            where: {
                name
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
module.exports = {addCommodity, checkName, getCommodity, getCount, deleteCommodity, putCommodity}