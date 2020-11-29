const db = require('../service');
const jwt    = require('jsonwebtoken');
var md5 = require('md5');
const KEY = "h0c l0 c() viek 12234567890";
module.exports = {
    _get: (req, res) => {
        res.render('index', {title: 'VietNails', Get_api: 'api'});
    },
    login_user: async (req, res) => {
        let phone = req.body.phone;
        let password = req.body.password;
        console.log("222",password);
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
                    let payload = {
                        phone:phone,
                        password:password,
                        type:"access"
                    }
                    let  token  = jwt.sign(payload, KEY , {algorithm:'HS256',expiresIn: 60})
                    console.log("access")
                    res.json({"status": "200", "error": false, message: 'Login true!', "token": token});
                } else {
                    res.json({"status": "400", "error": true, message: 'Login false!'});
                }
            } catch (e) {
                console.log("err", e.toString())
            }

        })
    },
}

