const User = require('../models/User');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const UserController = {
  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        nombre,
        apellido,
        email,
        password,
        fechaNacimiento,
        codigoPostal,
        telefono,
        domicilio,
        ciudad,
        terminos,
        isAdmin,
      } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Nombre, email y contraseña son campos requeridos.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        fechaNacimiento,
        codigoPostal,
        telefono,
        domicilio,
        ciudad,
        terminos,
        isAdmin,
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },
 addProduct: async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    const { nombre, precio, categoria } = req.body;

    await Product.create({
      nombre,
      precio,
      categoria,
    });

    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ message: 'Error al agregar producto' });
  }
},

updateProduct: async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const { productId, nombre, precio, categoria } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    product.nombre = nombre;
    product.precio = precio;
    product.categoria = categoria;
    await product.save();

    res.status(200).json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
},

modifyProduct: async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
    const { productId, nuevoPrecio } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.precio = nuevoPrecio;
    await product.save();

    res.status(200).json({ message: 'Valor del producto modificado exitosamente' });
  } catch (error) {
    console.error('Error al modificar valor del producto:', error);
    res.status(500).json({ message: 'Error al modificar valor del producto' });
  }
},

loginUser: async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
},
};

module.exports = UserController;

