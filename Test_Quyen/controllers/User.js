const db = require('../service');
const user_model = require('../models/User_model');
let Login = require('./Login');
module.exports = {
    _get: (req, res) => {
        res.render('index', {title: 'VietNails', Get_api: 'api'});
    },
    get: (req, res) => {
        let sql = `SELECT * FROM user`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrUser = {
                    [user_model.id]: rown[i].id,
                    [user_model.phone]: rown[i].phone,
                    [user_model.password]: rown[i].password,
                    [user_model.email]: rown[i].email,
                    [user_model.fullName]: rown[i].fullName,
                    [user_model.lever]: rown[i].lever,
                    [user_model.avatar]: rown[i].avatar,
                    [user_model.address]: rown[i].address,
                    [user_model.otp]: rown[i].otp,
                    [user_model.birthday]: rown[i].birthday,
                    [user_model.gender]: rown[i].gender,
                    [user_model.is_active]: rown[i].is_active,
                    [user_model.created_user]: rown[i].created_user
                };
                obj.push(ArrUser);
            }
            var _ArrUser = JSON.stringify(obj);
            var UserJson = JSON.parse(_ArrUser);
            var ArrGetUser = [{"status": "200", "data": UserJson}]
            res.json(ArrGetUser);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM user WHERE id = ?'
        db.query(sql, [req.params.userId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrUser = {
                    [user_model.id]: rown[i].id,
                    [user_model.phone]: rown[i].phone,
                    [user_model.password]: rown[i].password,
                    [user_model.email]: rown[i].email,
                    [user_model.fullName]: rown[i].fullName,
                    [user_model.lever]: rown[i].lever,
                    [user_model.avatar]: rown[i].avatar,
                    [user_model.address]: rown[i].address,
                    [user_model.otp]: rown[i].otp,
                    [user_model.birthday]: rown[i].birthday,
                    [user_model.gender]: rown[i].gender,
                    [user_model.is_active]: rown[i].is_active,
                    [user_model.created_user]: rown[i].created_user
                };
                obj.push(ArrUser);
            }
            var _ArrUser = JSON.stringify(obj);
            var UserJson = JSON.parse(_ArrUser);
            var ArrGetUser = [{"status": "200", "data": UserJson}]
            res.json(ArrGetUser);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let userId = req.params.userId;
        let sql =`UPDATE user SET ? WHERE id = ?`
        db.query(sql, [data, userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    store: (req, res) => {
        let sql_check = `SELECT phone  FROM user WHERE phone =(${req.body.phone})`;
        db.query(sql_check, (err, rown, fields) => {
            if (err) throw err
            let data =req.body.lever;
            if (rown == "" && data != undefined) {
                if ( data <= 2 ) {
                    let sql = `INSERT INTO user SET ?`;
                    db.query(sql, [req.body], (err, response) => {
                        if (err) throw err
                        let sql = 'SELECT * FROM user WHERE phone = ?'
                        db.query(sql, [req.body.phone], (err, rown, fields) => {
                            if (err) throw err
                            var obj = [];
                            for (var i = 0; i < rown.length; i++) {
                                var INSERTUser = {
                                    [user_model.id]: rown[i].id,
                                    [user_model.phone]: rown[i].phone,
                                    [user_model.password]: rown[i].password,
                                    [user_model.email]: rown[i].email,
                                    [user_model.fullName]: rown[i].fullName,
                                    [user_model.lever]: rown[i].lever,
                                    [user_model.avatar]: rown[i].avatar,
                                    [user_model.address]: rown[i].address,
                                    [user_model.birthday]: rown[i].birthday,
                                    [user_model.gender]: rown[i].gender,
                                    [user_model.is_active]: rown[i].is_active,
                                };
                                obj.push(INSERTUser);
                            }
                            var _INSERTUser = JSON.stringify(obj);
                            var INSERTUserJson = JSON.parse(_INSERTUser);
                            res.json({"status": "200", "message": 'User INSERT Ok!', "data": INSERTUserJson})
                        })
                    })
                }else {
                    res.json({"status": "400", "message": 'User On INSERT Table lever Wrong !'})
                }
            } else {
                res.json({"status": "400", "message": 'User On INSERT !'})
            }
        })

    },
    delete: (req, res) => {
        let sql = 'DELETE FROM user WHERE id = ?'
        db.query(sql, [req.params.userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Delete success!'})
        })
    }
}

