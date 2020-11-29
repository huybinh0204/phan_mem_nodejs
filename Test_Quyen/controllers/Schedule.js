const db = require('../service');
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM schedule`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    time_schedule: rown[i].time_schedule,
                    phone: rown[i].phone,
                    status: rown[i].status,
                    Username: rown[i].Username,
                    content_schedule: rown[i].content_schedule,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM schedule WHERE id = ?'
        db.query(sql, [req.params.scheduleId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    time_schedule: rown[i].time_schedule,
                    phone: rown[i].phone,
                    status: rown[i].status,
                    Username: rown[i].Username,
                    content_schedule: rown[i].content_schedule,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let scheduleId = req.params.scheduleId;
        let sql = 'UPDATE schedule SET ? WHERE id = ?'
        db.query(sql, [data, scheduleId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", schedule: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO schedule SET ?`;
            console.log("content", data);

            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let sqlSELECT = `SELECT MAX(id) as id FROM schedule`;

                db.query(sqlSELECT, (err, rownM, fields) => {
                    if (err) throw err

                    const Idmap = rownM.map(x => x.id);
                    var ScheduleJson = JSON.parse(Idmap);
                    let _sqlSELECT = 'SELECT * FROM schedule WHERE id = ?'

                    db.query(_sqlSELECT, [ScheduleJson], (err, rown, fields) => {
                        if (err) throw err
                        var obj = [];
                        for (var i = 0; i < rown.length; i++) {
                            var ArrSchedule = {
                                id: rown[i].id,
                                time_schedule: rown[i].time_schedule,
                                phone: rown[i].phone,
                                status: rown[i].status,
                                Username: rown[i].Username,
                                content_schedule: rown[i].content_schedule,
                                created_schedule: rown[i].created_schedule,
                            };
                            obj.push(ArrSchedule);
                        }
                        var _ArrSchedule = JSON.stringify(obj);
                        var ScheduleJson = JSON.parse(_ArrSchedule);
                        var ArrGetSchedule = [{"status": "200", message: 'Schedule INSERT Ok!', "data": ScheduleJson}]
                        res.json(ArrGetSchedule);
                    })
                })
            })
        } else {
            res.json({"status": "400", message: 'Schedule No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM schedule WHERE id = ?'
        db.query(sql, [req.params.scheduleId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", schedule: 'Delete success!'})
        })
    }
}

