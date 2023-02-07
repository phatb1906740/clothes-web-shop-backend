const bcrypt = require('bcrypt');

const Admin = require('../models/admin');

let register = async (req, res, next) => {
    let email = req.body.email;
    let admin = await Admin.findOne({ where: { email } });
    if(admin) return res.status(409).send("Email đã tồn tại");
    else {
        let hashPassword = bcrypt.hashSync(req.body.password, 10);
        let newAdmin = { email: email, password: hashPassword };
        let createAdmin = await Admin.create(newAdmin);
        if(!createAdmin) {
            return res.status(400).send("Có lỗi trong quá trình tạo tài khoản vui lòng thử lại");
        }
        return res.send(createAdmin);
    }
}

let login = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let admin = await Admin.findOne({ where: { email } });
    if(!admin) {
        return res.status(401).send("Email không chính xác");
    }

    let isPasswordValid = bcrypt.compareSync(password, admin.password);
    if(!isPasswordValid) {
        return res.status(401).send("Mật khẩu không chính xác");
    }

    return res.send({ email: admin.email });
}

module.exports = {
    register,
    login,
};
