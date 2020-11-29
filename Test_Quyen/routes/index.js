var express = require('express');
var router = express.Router();
const vat = require('../config/Config_outher')
/* GET home page. */
router.get('/api/user/',vat.checkToken, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
