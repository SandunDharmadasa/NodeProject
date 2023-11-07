const express = require('express');
const router = express.Router();

const{addCruise,
    getCruise,
    editCruise,
    deleteCruise,
    deleteAll
} = require('../controllers/cruiseController');

router.post('/add', addCruise);
router.get('/get', getCruise);
router.put('/update/:id', editCruise);
router.delete('/delete/:id', deleteCruise);
router.delete('/delete', deleteAll);

module.exports = router;