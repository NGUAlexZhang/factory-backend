let express = require('express');
let router = express.Router();
let {addStaff, getStaff, getCount, deleteStaff, putStaff} = require('../api/staff')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.post('/', async (req, res) => {
    let {name, join_date, sex, attend} = req.body
    console.log(join_date)
    if (join_date === '') join_date = undefined
    if (attend === '') attend = undefined
    if (name === undefined || sex === undefined) {
        if (name === undefined) res.send({code: 400, msg: '请填写姓名'})
        else res.send({code: 400, msg: '请填写性别'})
        return;
    }
    try {
        console.log(name, join_date, sex)
        await addStaff(name, join_date, sex,attend)
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
        const data = await getStaff(name, id, order, by, page, size, siz)

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
        await deleteStaff(id)
        return res.send({code: 200, msg: '删除成功'})
    } catch (e) {
        return res.send({code: 400, msg: "删除失败，客户不存在"})
    }
})
router.put('/', async (req, res) => {
    let {id, name, sex, join_date,attend} = req.body
    console.log(join_date)
    if (id === undefined) {
        return res.send({code: 400, msg: "修改失败，客户不存在"})
    }
    if (join_date === '') join_date = undefined
    console.log(id, name, sex, join_date)
    try {
        await putStaff(id, name, join_date, sex,attend)
        return res.send({code: 200, msg: '修改成功'})
    } catch (e) {
        return res.send({code: 400, msg: "修改失败，客户不存在"})
    }
})
module.exports = router;