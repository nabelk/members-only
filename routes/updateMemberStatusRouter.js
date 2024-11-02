const router = require('express').Router();
const updateMemberStatusController = require('../controllers/updateMemberStatusController');

router.post('/', updateMemberStatusController);

module.exports = router;
