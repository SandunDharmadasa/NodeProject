const express = require('express');
const router = express.Router();

const{addUser,
    getUserById,
    login,
    getUser,
    editUser,
    deleteUser,
    deleteAll
} = require('../controllers/userController');

router.post('/add', addUser);
router.post('/login', login);
router.get('/get/:id', getUserById);
router.get('/get', getUser);
router.put('/update/:id', editUser);
router.delete('/delete/:id', deleteUser);
router.delete('/delete', deleteAll);

module.exports = router;