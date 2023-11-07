const express = require('express');
const router = express.Router();

const{addTravelAgent,
    getTravelAgentById,
    getTravelAgent,
    editTravelAgent,
    deleteTravelAgent,
    deleteAll
} = require('../controllers/travelAgentController');

router.post('/add', addTravelAgent);
router.get('/get/:id', getTravelAgentById);
router.get('/get', getTravelAgent);
router.put('/update/:id', editTravelAgent);
router.delete('/delete/:id', deleteTravelAgent);
router.delete('/delete', deleteAll);

module.exports = router;