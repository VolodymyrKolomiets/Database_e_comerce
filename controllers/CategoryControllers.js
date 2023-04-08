const { Category, Product, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body)
            res.status(201).send({ msg: 'Categoria creada con exito', category })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    },

    async updateCategory(req, res) {
        try {
          const category = await Category.findByPk(req.params.id);
          if (category) {
             await Category.update({ name: req.body.name } ,
            {
                where: {
                    id: req.params.id,
                },
            });
            res.send({ msg: "Category update"})
          }
          else{
            res.status(404).send({msg: `Error: No category whith id ${req.params.id} found`})
          }
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    
      async deleteCategory(req, res) {
        try {
          const { id } = req.params;
          const deleted = await Category.destroy({ where: { id: id } });
          if (deleted) {
            return res.status(200).send({msg:'Categoria eliminado'});
          }
          throw new Error('Categoria no encontrado');
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },
    
      async getAllCategories(req, res) {
        try {
          const category = await Category.findAll();
          res.status(200).send({ category });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
    
      async getAllCategoryWithProducts(req, res) {
        try {
          const category = await Category.findAll({ include: [Product] });
          res.status(200).send({ category });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },

      async getCategoryById(req, res) {
        try {
          const { id } = req.params;
          const category = await Category.findByPk(id);
          if (category) {
            return res.status(200).send({ category });
          }
          throw new Error('Categoria no encontrada');
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      },

   async searchByCategory(req, res) {
        try {
          const { category } = req.params;
          const categories = await Category.findAll({
            where: { category: { [Op.like]: `%${category}%` } },
            order: [['category', 'ASC']],
          });
          res.status(200).send({ categories });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },

    }

module.exports = CategoryController