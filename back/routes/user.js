const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const pwdValidator = require('../middlewares/pwd')


router.post('/signup', pwdValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
