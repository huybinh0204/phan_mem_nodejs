
module.exports = function(app) {
    let UserCtrl = require('../controllers/User');
    let ServiceCtrl = require('../controllers/Service_shop');
    let ScheduleCtrl = require('../controllers/Schedule');
    let ShopCtrl = require('../controllers/Shop');
    let LoginCtrl = require('../controllers/Login');

    app.route('/')
        .get(UserCtrl._get)
    // Login
    app.route('/api/login/')
        .post(LoginCtrl.login_user);
    // api user
    app.route('/api/user/')
        .get(UserCtrl.get);
    app.route('/api/user/')
        .post(UserCtrl.store);
    app.route('/api/user/:userId')
        .get(UserCtrl.detail);
    app.route('/api/user/edit/:userId')
        .put(UserCtrl.update);
    app.route('/api/user/delete/:userId')
        .delete(UserCtrl.delete);

    // api service
    app.route('/api/service/')
        .get(ServiceCtrl.get);
    app.route('/api/service/')
        .post(ServiceCtrl.store);
    app.route('/api/service/:serviceId')
        .get(ServiceCtrl.detail);
    app.route('/api/service/edit/:serviceId')
        .put(ServiceCtrl.update);
    app.route('/api/service/delete/:serviceId')
        .delete(ServiceCtrl.delete);

    // api schedule
    app.route('/api/schedule/')
        .get(ScheduleCtrl.get);
    app.route('/api/schedule/')
        .post(ScheduleCtrl.store);
    app.route('/api/schedule/:scheduleId')
        .get(ScheduleCtrl.detail);
    app.route('/api/schedule/edit/:scheduleId')
        .put(ScheduleCtrl.update);
    app.route('/api/schedule/delete/:scheduleId')
        .delete(ScheduleCtrl.delete);

    // api shop
    app.route('/api/shop/')
        .get(ShopCtrl.get);
    app.route('/api/shop/')
        .post(ShopCtrl.store);
    app.route('/api/shop/:shopId')
        .get(ShopCtrl.detail);
    app.route('/api/shop/edit/:shopId')
        .put(ShopCtrl.update);
    app.route('/api/shop/delete/:shopId')
        .delete(ShopCtrl.delete);
};
// const db = require('../service');
// module.exports = function (req, res) {
//     let sql = `SELECT * FROM menu`;
//     db.query(sql, (err, rown, fields) => {
//         if (err) throw err
//         res.json(rown);
//         for (var i = 0; i < rown.length; i++) {
//             var access_admin = Number(rown[i].lever_menu.slice(15,16));
//             var nv = Number(rown[i].lever_menu.slice(22,23));
//             var kh = Number(rown[i].lever_menu.slice(29,30));
//             //     // if(access_admin == 1 && nv == 2 && kh ==3 ){
//             //     //     console.log("111")
//             //     // }else if(access_admin != 1 && nv == 2 && kh ==3 ){
//             //     //     console.log("444")
//             //     // }else if(access_admin == 1 && nv != 2 && kh ==3 ){
//             //     //     console.log("555")
//             //     // }else if(access_admin == 1 && nv == 2 && kh !=3 ){
//             //     //     console.log("666")
//             //     // }else if(access_admin != 1 && nv != 2 && kh !=3 ){
//             //     //     console.log("666")
//             //     // }
//             // }
//
//         })
//
//
// };
