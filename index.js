const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');

const SINH_VIEN_ROUTER = require('./routes/sinhvien');
const KHOA_ROUTER = require('./routes/khoa');
const USER_ROUTER = require('./routes/User');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());

// app.set("layout extractScripts", true);

app.use('/sinhvien', SINH_VIEN_ROUTER);
app.use('/khoa', KHOA_ROUTER);
app.use('/user', USER_ROUTER);
app.get('/', (req, res) => {
    res.redirect('/user/dang-nhap');
});

const uri = 'mongodb://localhost/SinhVienDB';
const PORT = process.env.PORT || 3000;

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log('Server started at port 3000'));
});

