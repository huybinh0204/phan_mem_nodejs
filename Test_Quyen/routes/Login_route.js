var express = require('express');
var router = express.Router();
const db = require('../service');
const jwt    = require('jsonwebtoken');
const rt = require("../config/Kemy")
var md5 = require('md5');
/* GET home page. */
router.post('/login/', function(req, res, next) {
    let phone = req.body.phone;
    let password = req.body.password;
    var sql =``;
    if (phone != "" && password != ""){
        sql = `SELECT * FROM user WHERE phone = "${phone}" and password = "${md5(password)}"`;
    }else {
        sql = `SELECT * FROM user WHERE phone = "${phone}" and password IS null`;
    }
    db.query(sql, [phone,password], (err, rown, fields) => {
        if (err) throw err
        try {

            if (rown != "") {
                var payload = {};
                for (var i = 0; i<rown.length;i++){
                    payload = {
                        phone:rown[i].phone,
                        password:rown[i].password,
                        email:rown[i].email,
                        point:rown[i].point,
                        fullName:rown[i].fullName,
                        avatar:rown[i].avatar,
                        address:rown[i].address,
                        id_roles:rown[i].id_roles,
                        birthday:rown[i].birthday,
                        gender:rown[i].gender,
                        is_active:rown[i].is_active,
                        id_Shop:rown[i].id_Shop,
                        type:"access"
                    }
                }
                let  token  = jwt.sign(payload, rt.KEY , {algorithm:'HS256',expiresIn: 60})
                console.log("access")
                res.send(token);
            } else {
                res.json({"status": "400", "error": true, message: 'Login false!'});
            }
        } catch (e) {
            console.log("err", e.toString())
        }

    })
});

module.exports = router;
