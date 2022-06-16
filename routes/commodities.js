let express = require('express');
const {addCommodity, checkName, getCommodity, getCount, deleteCommodity, putCommodity} = require("../api/commondities");
let router = express.Router();
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.post('/', async (req, res) => {
    const {name, price} = req.body
    if (name === undefined) return res.send({code: 400, msg: '请填写名称'})
    if (price === undefined) return res.send({code: 400, msg: '请填写价格'})
    try {
        await addCommodity(name, price)
        res.send({code: 200, msg: '添加成功'})
    } catch (err) {
        res.send({code: 400, msg: '添加失败'})
    }
})
router.get('/check', async (req, res) => {
    const {name} = req.query
    try {
        const size = await checkName(name)
        if (size === 0) res.send({code: 200, exist: false})
        else res.send({code: 200, exist: true})
    } catch (err) {
        res.send({code: 502, msg: '内部错误'})
    }
})
router.get('/', async (req, res) => {
    let {name, order, by, page, size} = req.query
    if (name === undefined) name = ''
    if (order === undefined) order = 'DESC'
    if (by === undefined) by = 'name'
    if (page === undefined) page = 1
    if (size === undefined) size = 20
    page = parseInt(page)
    size = parseInt(size)
    try {
        const siz = await getCount(name);
        const data = await getCommodity(name, order, by, page, size, siz)
        res.send({code: 200, data, size: siz})
    } catch (err) {
        res.send(err)
    }
})
router.delete('/', async (req, res) => {
    const {name} = req.body
    try {
        await deleteCommodity(name)
        res.send({code: 200, msg: '删除成功'})
    } catch (err) {
        res.send({code: 400, msg: '删除失败'})
    }
})
router.put('/', async (req, res) => {
    const {name, price} = req.body
    try {
        await putCommodity(name, price)
        return res.send({code: 200, msg: '修改成功'})
    } catch (err) {
        return res.send({code: 400, msg: '修改失败'})
    }
})
module.exports = router