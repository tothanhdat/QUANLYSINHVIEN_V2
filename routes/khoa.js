const route = require('express').Router();
const ROLE_ADMIN = require('../utils/checkRole');
const KHOA_MODEL = require('../models/Khoa');

route.get('/them', ROLE_ADMIN, async (req, res) => {
    res.render('pages/themkhoa', { alertError: false });
});
route.post('/add', ROLE_ADMIN, async (req, res) => {
    let { tenKhoa, maKhoa } = req.body;
    try {
        let result = await KHOA_MODEL.insert(tenKhoa, maKhoa);
        if (result.error && result.message == 'khoa_existed') return res.render('pages/themkhoa', { alertError: true });
        res.redirect('/khoa/danh-sach');
    } catch (error) {
        res.json(error.message)
    }
});
route.get('/danh-sach', ROLE_ADMIN, async (req, res) => {
    let result = await KHOA_MODEL.getList();
    res.render('pages/danh-sach-khoa', { result: result.data });
});
route.get('/tim-kiem', async (req, res) => {
    try {
        let { search } = req.query;
        const dataSearch = await KHOA_MODEL.find({
            $or: [
                { tenKhoa: new RegExp(search, 'i') },
                { maKhoa: new RegExp(search, 'i') },
            ]
        });
        res.json({ data: dataSearch });
    } catch (error) {
        res.json('Error');
    }
});
route.get('/:id?', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    //let { tenKhoa, maKhoa } = req.body;
    let result = await KHOA_MODEL.getID(id);
    res.json(result);
});
route.get('/update/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let infoKhoa = await KHOA_MODEL.getID(id);
    res.render('pages/edit-khoa', { infoKhoa: infoKhoa.data });
});
route.post('/update/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let { maKhoa, tenKhoa } = req.body;
    console.log({ id, maKhoa, tenKhoa });
    try {
        let result = await KHOA_MODEL.updateID(id, maKhoa, tenKhoa);
        res.redirect('/khoa/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-update-sinh-vien');
    }
});

route.get('/delete/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    //console.log({id})
    try {
        let result = await KHOA_MODEL.deleteID(id);
        res.redirect('/khoa/danh-sach');
    } catch (error) {
        res.redirect('/khoa/loi-xoa-khoa');
    }

});

module.exports = route;
