const mongoose = require('mongoose');
var Shema = mongoose.Schema;
var KhoaSchema = new Shema ({
    tenKhoa: String,
    maKhoa: String
});
var Khoamodel = mongoose.model('khoa', KhoaSchema);
module.exports = Khoamodel