const { Category } = require('../models/index.js');

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body)
            res.status(201).send({ msg: 'Categoria creada con exito', order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    },
    /////////aqui van las siguentes endpoints
}

module.exports = CategoryController