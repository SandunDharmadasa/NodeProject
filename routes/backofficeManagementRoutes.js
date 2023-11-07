const express = require('express');
const router = express.Router();

const{addBackofficeManagement,
    getBackofficeManagement,
    editBackofficeManagement,
    deleteBackofficeManagement,
    deleteAll
} = require('../controllers/backofficeManagementController');

router.post('/add', addBackofficeManagement);
router.get('/get', getBackofficeManagement);
router.put('/update/:id', editBackofficeManagement);
router.delete('/delete/:id', deleteBackofficeManagement);
router.delete('/delete', deleteAll);

module.exports = router;