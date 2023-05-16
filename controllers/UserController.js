const { User, Order, Product, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");

const UserController = {

    async create(req, res, next) {
        //req.body.role = "user" // || "admin"; no funciona! prq le asignamos el valor directamente, a pesar de indicarlo en el model, no se puede cambiar indicandolo en el endpoint"postman" intentado de cambiarlo en el postaman!!!!!!!!!!

        try {
            const password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({ ...req.body, password, confirmed: false })
            const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
            const url = 'http://localhost:8080/users/confirm/' + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a> 
        Confirme su correo en 48 horas`,
            });

            res.status(201).send({ msg: 'Usuario creado con exito por favor confirme su correo', user })

        } catch (error) {
            console.error(error)
            next(error)
        }
    },

    async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res
                    .status(400)
                    .send({ message: "Usuario o contraseña incorrectos" });
            }
            if (!user.confirmed) {

                return res.status(400).send({ message: "Debes confirmar tu correo" })
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .send({ message: "Usuario o contraseña incorrectos" });
            }
            const token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id })
            res.send({ token, message: 'Bienvenido' + user.name, user });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    },



    async getUserInfoById(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id, {
                include: {
                    model: Order,
                    include: [Product]
                }
            });
            if (user) {
                return res.status(200).send( user );
            }
            throw new Error('Usuario no encontrado');
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async logout(req, res, next) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [{ UserId: req.user.id },
                    { token: req.headers.authorization }]
                }
            });
            res.send({ logoutMessage: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
           // res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
            next(error);
        }
    },

    async confirm(req, res, next) {
        try {
            const token = req.params.emailToken
            const payload = jwt.verify(token, jwt_secret)
            await User.update({ confirmed: true }, {
                where: {
                    email: payload.email
                }
            })
            res.status(201).send("Usuario confirmado con éxito");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = UserController