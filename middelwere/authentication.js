const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

const authentication = async (req, res, next) => {

    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findByPk(payload.id);
        const tokenFound = await Token.findOne({
            where: {
                [Op.and]: [{ UserId: user.id }, { token: token }]
            }
        });
        if (!tokenFound) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
}

////////////////poner en cada ruta que yo quiero que este segura con authentication "autentificacion de usuario autorizado"
///////////////EJEMPLO 1 router.delete("/deleteById/:id",authentication,UserController.delete)
//////////////EJEMPLO 2 router.put("/updateById/:id",authentication,UserController.update)

const isAdmin = async (req, res, next) => {
    const admins = ['admin', 'superadmin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permisos'
        });
    }
    next();
}
///////////////EJEMPLO router.delete("/deleteById/:id",authentication,isAdmin,UserController.delete)


module.exports = { authentication, isAdmin}

