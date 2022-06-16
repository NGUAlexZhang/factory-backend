const customer = require('../db/moels/customers')
const {Op} = require('sequelize')
const addCustomer = async (name, birth, sex) => {
    try {
        await customer.create({
            name, birth, sex
        })
    } catch (e) {
        return Promise.reject(e)
    }
}
const getCustomer = async (name, id, order, by, page, size, count) => {
    // console.log(page, size)
    try {
        const res = await customer.findAll({
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
        const res = await customer.count({
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
const deleteCustomer = async (id) => {
    try {
        const res = await customer.destroy({
            where: {
                id
            }
        })
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
const putCustomer = async (id, name, birth, sex) => {
    try {
        await customer.update({name, birth, sex}, {
            where: {
                id
            }
        })
    } catch (err) {
        return Promise.reject(err)
    }
}
module.exports = {addCustomer, getCustomer, getCount, deleteCustomer, putCustomer}