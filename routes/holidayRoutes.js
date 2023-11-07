const express = require('express');
const router = express.Router();

const{addHoliday,
    getHoliday,
    editHoliday,
    deleteHoliday,
    deleteAll
} = require('../controllers/holidayController');

router.post('/add', addHoliday);
router.get('/get', getHoliday);
router.put('/update/:id', editHoliday);
router.delete('/delete/:id', deleteHoliday);
router.delete('/delete', deleteAll);

module.exports = router;