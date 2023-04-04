const { Product } = require('../models/index.js');

const ProductController = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body)
            res.status(201).send({ msg: 'Producto creado con exito', order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    },
    /////////aqui van las siguentes endpoints
}

module.exports = ProductController