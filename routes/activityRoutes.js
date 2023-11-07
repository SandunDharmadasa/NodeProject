const express = require('express');
const router = express.Router();

const{addActivity,
    getActivity,
    editActivity,
    deleteActivity,
    deleteAll
} = require('../controllers/activityController');

router.post('/add', addActivity);
router.get('/get', getActivity);
router.put('/update/:id', editActivity);
router.delete('/delete/:id', deleteActivity);
router.delete('/delete', deleteAll);

module.exports = router;