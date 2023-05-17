const { Order, OrderProduct } = require('../models/index.js');


const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create({...req.body,UserId:req.user.id});
            await order.addProduct(req.body.ProductId)
            res.status(201).send({ msg: 'Order creado con exito', order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }

    },

      async getAllOrdersWithProducts(req, res) {
        try {
          const ordersWithProduct = await OrderProduct.findAll();
          res.status(200).send({ ordersWithProduct });
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
      },
}

module.exports = OrderController