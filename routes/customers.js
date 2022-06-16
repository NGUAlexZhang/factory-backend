let express = require('express');
let router = express.Router();
let {addCustomer, getCustomer, getCount, deleteCustomer, putCustomer} = require('../api/customers')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.post('/', async (req, res) => {
    let {name, birth, sex} = req.body
    console.log(birth)
    if (birth === '') birth = undefined
    if (name === undefined || sex === undefined) {
        if (name === undefined) res.send({code: 400, msg: '请填写姓名'})
        else res.send({code: 400, msg: '请填写性别'})
        return;
    }
    try {
        console.log(name, birth, sex)
        await addCustomer(name, birth, sex)
        res.send({code: 200, msg: '添加成功'})
    } catch (e) {
        // console.log(e)
        res.send(e)
    }
});
router.get('/', async (req, res) => {
    let {id, name, order, by, page, size} = req.query
    if (id === undefined) id = ''
    if (name === undefined) name = ''
    if (order === undefined || (order !== 'DESC' && order !== 'ASC')) order = 'DESC'
    if (by === undefined || (by !== 'name' && by !== 'id')) by = 'name'
    if (page === undefined) page = 1
    if (size === undefined) size = 20
    try {
        const siz = await getCount(name, id);
        const data = await getCustomer(name, id, order, by, page, size, siz)

        // console.log(data)
        res.send({code: 200, data, size: siz})
    } catch (e) {
        res.send(e)
    }

})
router.delete('/', async (req, res) => {
    let {id} = req.body
    if (id === undefined) {
        return res.send({code: 400, msg: "删除失败，客户不存在"})
    }
    try {
        await deleteCustomer(id)
        return res.send({code: 200, msg: '删除成功'})
    } catch (e) {
        return res.send({code: 400, msg: "删除失败，客户不存在"})
    }
})
router.put('/', async (req, res) => {
    let {id, name, sex, birth} = req.body
    console.log(birth)
    if (id === undefined) {
        return res.send({code: 400, msg: "修改失败，客户不存在"})
    }
    if (birth === '') birth = undefined
    console.log(id, name, sex, birth)
    try {
        await putCustomer(id, name, birth, sex)
        return res.send({code: 200, msg: '修改成功'})
    } catch (e) {
        return res.send({code: 400, msg: "修改失败，客户不存在"})
    }
})
module.exports = router;