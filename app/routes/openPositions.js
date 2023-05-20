const router = require('express').Router();

// open position controller
const { openPosition } = require('../controllers');

router.get('/open-positions', openPosition.getDepartmentDetails);

module.exports = router;
