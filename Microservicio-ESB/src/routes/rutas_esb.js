
const express = require("express");

var router = express.Router(); 

const controller_esb = require('../controllers/controller-esb');
// multiples -> router.route('/login').get()
// unica  -> router.get()


router.post('/esb_signup', controller_esb.log_signup);

router.post('/esb_login', controller_esb.log_login);

module.exports = router;