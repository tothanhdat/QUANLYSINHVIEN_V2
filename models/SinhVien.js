const SINH_VIEN = require('../database/SinhVien-coll');
module.exports = class SinhVien extends SINH_VIEN {
    static insert({ tenSV, mssv, maKhoa, avatar }) {
        return new Promise(async resolve => {
            try {
                let checkExist = await SINH_VIEN.findOne({ mssv });
                if (checkExist) return resolve ({ error: true, message: 'sinh_vien_existed'});
                let newSinhVien = new SinhVien({ tenSV, mssv, maKhoa, avatar });
                let saveSinhVien = await newSinhVien.save();
                if (!saveSinhVien) return resolve({ error: true, message: 'cannot_insert_sinh_vien' });
                resolve({ error: false, data: newSinhVien });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getList() {
        return new Promise(async resolve => {
            try {
                let listID = await SinhVien.find();
                if (!listID) return resolve({ error: true, message: 'cannot_get_list_sinh_vien' });
                resolve({ error: false, data: listID })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getID(id) {
        return new Promise(async resolve => {
            try {
                let getID = await SinhVien.findOne({ _id: id });
                if (!getID) return resolve({ error: true, message: 'cannot_get_id_sinh_vien' });
                resolve({ error: false, data: getID });
            } catch (error) {
                return resolve({ error: true, message: error.message })
            }
        });
    }
    static updateID({ id, hoTen, mssv, maKhoa, avatar }) {
        return new Promise(async resolve => {
            try {
                console.log({ id, hoTen, mssv, maKhoa, avatar });
                // let checkID = await SinhVien.findById({ _id: id });
                // if (!checkID) return resolve({ error: true, message: 'cannot_search_id_sinh_vien' });
                let updateID = await SinhVien.findByIdAndUpdate(id, { tenSV: hoTen, mssv, maKhoa, avatar}, { new: true });
                resolve({ error: false, data: updateID });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static deleteID(id) {
        return new Promise(async resolve => {
            try {
                let deleteID = await SinhVien.findByIdAndDelete(id);
                resolve({ error: false, data: deleteID });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
}