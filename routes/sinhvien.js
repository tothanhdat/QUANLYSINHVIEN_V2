const route = require('express').Router();
const SINH_VIEN_MODEL = require('../models/SinhVien');
const KHOA_MODEL = require('../models/Khoa');
const ROLE_ADMIN = require('../utils/checkRole');
const { uploadMulter } = require('../utils/config_multer');
const fs = require('fs');

route.get('/them', ROLE_ADMIN, async (req, res) => {
    let listKhoa = await KHOA_MODEL.getList();
    res.render('pages/them-sinh-vien', { listKhoa: listKhoa.data, alertInsertStudentError: false });
});
route.post('/add', ROLE_ADMIN, uploadMulter.single('avatar'), async (req, res) => {
    try {
        let { hoTen, mssv, maKhoa } = req.body;
        let infoFile = req.file;
        let listKhoa = await KHOA_MODEL.getList();
        let infoSinhVien = await SINH_VIEN_MODEL.insert({ tenSV: hoTen, mssv, maKhoa, avatar: infoFile.originalname });
        console.log({ infoSinhVien });
        if (infoSinhVien.error && infoSinhVien.message == 'sinh_vien_existed') return res.render('pages/them-sinh-vien', { listKhoa: listKhoa.data, alertInsertStudentError: true });
        res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.json(error.message);
    }
});
route.get('/danh-sach', ROLE_ADMIN, async (req, res) => {
    let result = await SINH_VIEN_MODEL.getList();
    res.render('pages/danh-sach-sinh-vien', { result: result.data });
});
route.get('/tim-kiem', async (req, res) => {
    try {
        let { search } = req.query;
        const dataSearch = await SINH_VIEN_MODEL.find({
            $or: [
                { tenSV: new RegExp(search, 'i') },
                { mssv: new RegExp(search, 'i') },
                { maKhoa: new RegExp(search, 'i') },
            ]
        });
        res.json({ data: dataSearch });
    } catch (error) {
        res.json('Error');
    }
});

route.get('/update/:id', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let result = await SINH_VIEN_MODEL.getID(id);
    let listFaculty = await KHOA_MODEL.getList();
    res.render('pages/edit-sinh-vien', { infoStudent: result.data, listFaculty: listFaculty.data });
});
route.post('/update/:id', ROLE_ADMIN, uploadMulter.single('avatar'), async (req, res) => {
    try {
        let { id } = req.params;
        let infoFile  = req.file;
        let { hoTen, mssv, maKhoa } = req.body;
        let result = await SINH_VIEN_MODEL.updateID({ id, hoTen, mssv, maKhoa, avatar: infoFile.originalname });
        res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-update-sinh-vien');
    }
});
route.get('/delete/:id', ROLE_ADMIN, async (req, res) => {
    try {
        let { id } = req.params;
        let result = await SINH_VIEN_MODEL.deleteID(id);
        fs.unlink(`./public/image/${result.data.avatar}`, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
        res.redirect('/sinhvien/danh-sach');
    } catch (error) {
        res.redirect('/sinhvien/loi-xoa-sinh-vien');
    }
});
route.get('/:id?', ROLE_ADMIN, async (req, res) => {
    let { id } = req.params;
    let result = await SINH_VIEN_MODEL.getID(id);
    res.json(result);
});

module.exports = route;