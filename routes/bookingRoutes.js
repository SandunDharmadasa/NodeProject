const express = require('express');
const router = express.Router();

const{addBooking,
    getBooking,
    editBooking,
    deleteBooking,
    deleteAll
} = require('../controllers/bookingController');

router.post('/add', addBooking);
router.get('/get', getBooking);
router.put('/update/:id', editBooking);
router.delete('/delete/:id', deleteBooking);
router.delete('/delete', deleteAll);

module.exports = router;