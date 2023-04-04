const { User } = require('../models/index.js');

const UserController = {
    async create(req, res) {
        req.body.role = "user";
        try {
            const user = await User.create(req.body)
            res.status(201).send({ msg: 'Usuario creado con exito', user })
        } catch (error) {
            console.error(error)
            res.send(error)
        }

    },
    /////////aqui van las siguentes endpoints
}

module.exports = UserController