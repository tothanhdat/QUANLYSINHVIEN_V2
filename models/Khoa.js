const KHOA = require('../database/Khoa-coll');
module.exports = class Khoa extends KHOA {
    static insert(tenKhoa, maKhoa) {
        return new Promise(async resolve => {
            try {
                let checkExist = await KHOA.findOne({ tenKhoa });
                if (checkExist) return resolve ({ error: true, message: 'khoa_existed'})
                let newKhoa = new Khoa({ tenKhoa, maKhoa });
                let saveKhoa = await newKhoa.save();
                if (!saveKhoa) return resolve({ error: true, message: 'cannot_insert_khoa' });
                resolve({ error: false, data: newKhoa })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getList() {
        return new Promise(async resolve => {
            try {
                let list = await Khoa.find();
                if (!list) return resolve({ error: true, message: 'cannot_get_list_khoa' });
                resolve({ error: false, data: list })
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static getID(id) {
        return new Promise(async resolve => {
            try {
                let getID = await Khoa.findOne({ _id: id });
                if (!getID) return resolve({ error: true, message: 'cannot_get_id_khoa' });
                resolve({ error: false, data: getID });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static updateID(id, maKhoa, tenKhoa) {
        return new Promise(async resolve => {
            try {
                let checkID = await Khoa.findById(id);
                if (!checkID) return resolve({ error: true, message: 'cannot_search_id_khoa' });
                let updateID = await Khoa.findByIdAndUpdate({ _id: id }, { maKhoa, tenKhoa }, { new: true });
                resolve({ error: false, data: updateID });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }
    static deleteID(id) {
        return new Promise(async resolve => {
            try {
                // let checkID = await Khoa.findById({ _id: id })
                // if (!checkID) return resolve({ error: true, message: 'cannot_search_id_khoa' });
                let deleteKhoa = await Khoa.findByIdAndDelete(id);
                resolve({ error: false, data: deleteKhoa })
            } catch (error) {
                return resolve({ error: true, message: error.message })
            }
        });
    }
}