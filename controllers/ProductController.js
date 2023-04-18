const { Product, Category, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const ProductController = {
    async create(req, res, next) {
        try {
            const product = await Product.create(req.body);
            res.status(201).send({ msg: 'Producto creado con exito', product })
        } catch (error) {
            console.error(error)
            next(error)
        }
    },

    async update(req, res) {
        try {
          const { id } = req.params;
          const [updated] = await Product.update(req.body, { where: { id: id } });
          if (updated) {
            const updatedProduct = await Product.findOne({ where: { id: id } });
            return res.status(200).json({ product: updatedProduct });
          }
          throw new Error('Producto no encontrado');
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    
      async delete(req, res) {
        try {
          const { id } = req.params;
          const deleted = await Product.destroy({ where: { id: id } });
          if (deleted) {
            return res.status(200).send({msg:'Producto eliminado'});
          }
          throw new Error('Producto no encontrado');
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    
      async getById(req, res) {
        try {
          const { id } = req.params;
          const product = await Product.findByPk(id);
          if (product) {
            return res.status(200).send({ product });
          }
          throw new Error('Producto no encontrado');
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    
      async getAll(req, res) {
        try {
          const products = await Product.findAll({ include: [Category] });
          res.status(200).send({ products });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    
      async searchByName(req, res) {
        try {
          const { name } = req.params;
          const products = await Product.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            order: [['price', 'ASC']],
          });
          res.status(200).json({ products });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    
      async filterByPrice(req, res) {
        try {
          const { price } = req.params;
          const products = await Product.findAll({
            where: { price: { [Op.like]: `${price}` } },
            order: [['price', 'ASC']],
          });
          res.status(200).json({ products });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    
      async sortByPrice(req, res) {
        try {
          const products = await Product.findAll({
            order: [['price', 'DESC']],
          });
          res.status(200).json({ products });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    
      async createWithValidation(req, res) {
        try {
          const { name, price, description } = req.body;
          if (!name || !price || !description) {
            throw new Error('Todos los campos son obligatorios');
          }
          const product = await Product.create(req.body);
          res.status(201).json({ product });
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    };

module.exports = ProductController