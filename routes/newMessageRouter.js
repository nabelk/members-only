const router = require('express').Router();
const newMessageController = require('../controllers/newMessageController');

router.post('/', newMessageController);

module.exports = router;
