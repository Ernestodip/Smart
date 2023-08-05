const { Op } = require('sequelize');
const Product = require('../models/Product');

const ProductController = {
  getProducts: async (req, res) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize;
      const products = await Product.findAndCountAll({
        limit: pageSize,
        offset,
      });
      res.status(200).json({
        products: products.rows,
        totalCount: products.count,
        totalPages: Math.ceil(products.count / pageSize),
      });
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      res.status(500).json({ message: 'Error al obtener la lista de productos' });
    }
  },

  filterProducts: async (req, res) => {
    try {
      const { page = 1, pageSize = 10, nombre, precioMin, precioMax, orden, categoria } = req.query;
      const offset = (page - 1) * pageSize;
      const options = {
        where: {},
        order: [['precio', orden === 'asc' ? 'ASC' : 'DESC']],
        limit: pageSize,
        offset,
      };

      if (nombre) {
        options.where.nombre = {
          [Op.iLike]: `%${nombre}%`,
        };
      }

      if (precioMin) {
        options.where.precio = {
          [Op.gte]: precioMin,
        };
      }

      if (precioMax) {
        options.where.precio = {
          ...options.where.precio,
          [Op.lte]: precioMax,
        };
      }

      if (categoria) {
        options.where.categoria = categoria;
      }

      const products = await Product.findAndCountAll(options);

      res.status(200).json({
        products: products.rows,
        totalCount: products.count,
        totalPages: Math.ceil(products.count / pageSize),
      });
    } catch (error) {
      console.error('Error al filtrar y ordenar productos:', error);
      res.status(500).json({ message: 'Error al filtrar y ordenar productos' });
    }
  },
};

module.exports = ProductController;



