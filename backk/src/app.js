const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = 3001;



const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const ProductOrder = require('./models/ProductOrder');
const CartItem = require('./models/CartItem');


User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: ProductOrder });
Product.belongsToMany(Order, { through: ProductOrder });


const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: 'Mermila2',
  database: 'smart',
});


async function syncDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const hashedPassword = await bcrypt.hash('Mermila2', 10);

    await User.findOrCreate({
      where: { email: 'admin@smart.com' },
      defaults: {
        nombre: 'Administrador',
        email: 'admin@smart.com',
        password: hashedPassword,
        isAdmin: true,
      },
    });

    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use([
  check('nombre').notEmpty().withMessage('El campo "nombre" es requerido.'),
  check('email').notEmpty().withMessage('El campo "email" es requerido.').isEmail().withMessage('El email debe ser válido.'),
  check('password').notEmpty().withMessage('El campo "password" es requerido.').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
]);

app.use((err, req, res, next) => {
  if (err instanceof validationResult) {
    const errors = err.array().map((error) => error.msg);
    return res.status(422).json({ errors });
  }
  next(err);
});


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

syncDatabase();

app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en http://localhost:${PORT}`);
});
