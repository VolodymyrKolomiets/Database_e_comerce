const { Order } = require('../models/index.js');

const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body)
            res.status(201).send({ msg: 'Order creado con exito', order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    },
    /////////aqui van las siguentes endpoints
}

module.exports = OrderController