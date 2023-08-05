const { CartItem, Product } = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    await CartItem.create({
      productId: product.id,
      quantity,
    });
    const cart = await CartItem.findAll({
      include: Product,
    });

    res.json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar producto al carrito.' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cartItem = await CartItem.findOne({ where: { productId } });

    if (!cartItem) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
    }
    await cartItem.destroy();
    const cart = await CartItem.findAll({
      include: Product,
    });

    res.json(cart);
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar producto del carrito.' });
  }
};
