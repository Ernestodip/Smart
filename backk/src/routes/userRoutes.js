const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.post('/add-product', authMiddleware, UserController.addProduct); // Agregar un nuevo producto a la lista
router.put('/update-product', authMiddleware, UserController.updateProduct); // Actualizar un producto existente en la lista
router.patch('/modify-product', authMiddleware, UserController.modifyProduct); // Modificar valores de un producto de la lista


module.exports = router;


