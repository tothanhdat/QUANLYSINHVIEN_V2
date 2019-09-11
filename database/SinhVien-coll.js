const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SinhVienSchema = new Schema({
    tenSV: String,
    mssv: String,
    maKhoa: String,
    avatar: String
});
var SinhVienmodel = mongoose.model('sinhvien', SinhVienSchema);
module.exports = SinhVienmodel;
