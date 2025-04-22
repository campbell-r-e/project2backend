const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();
router.get('/alldata', feedController.getalldata_by_user);
router.post('/login',feedController.login);
module.exports = router;