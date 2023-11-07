const express = require('express');
const router = express.Router();

const{addCruiseBooking,
    getCruiseBooking,
    editCruiseBooking,
    deleteCruiseBooking,
    deleteAll
} = require('../controllers/cruiseBookingController');

router.post('/add', addCruiseBooking);
router.get('/get', getCruiseBooking);
router.put('/update/:id', editCruiseBooking);
router.delete('/delete/:id', deleteCruiseBooking);
router.delete('/delete', deleteAll);

module.exports = router;