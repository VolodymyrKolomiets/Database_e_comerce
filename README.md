# Título del Proyecto

_Base de datos MySQL hecha con **Sequelize**_

## Comenzando 🚀

_Creando servidor con **NodeJS** usando el paquete **Expres** y agregando una base de datos **MySQL** con **Sequelize**_

# 1 Instalación de dependencias: Primero, necesitas instalar las dependencias necesarias. Asegúrate de tener Node.js y MySQL instalados en tu entorno de desarrollo. Luego, puedes instalar Sequelize y los controladores de MySQL ejecutando los siguientes comandos en tu proyecto:
``
npm install sequelize mysql2 express
``
# A continuacion iniciar Sequelize:
``
sequelize init
``

# 2 Configuración de la conexión a la base de datos: Luego, necesitas configurar la conexión a la base de datos en tu aplicación. Puedes hacerlo creando un archivo de configuración, por ejemplo config.js, donde puedes especificar la información de conexión a tu base de datos MySQL, como el nombre de usuario, contraseña, host y nombre de la base de datos. Aquí hay un ejemplo de cómo puedes configurar la conexión:
``// config.js

module.exports = {
  development: {
    username: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    // Configuración para producción
  },
  // Otros entornos de desarrollo o pruebas
};
``
**Luego en consola crear la base de datos con el commando:**
``
sequelize db:create
``

# 3 Definición de modelos: Luego, necesitas definir tus modelos, que son representaciones de tus tablas en la base de datos. Puedes crear un archivo para cada modelo en una carpeta, por ejemplo models, y definir tus modelos utilizando las migraciones  de Sequelize. Aquí hay un ejemplo de cómo puedes definir un modelo para una tabla de usuarios:

**sequelize model:generate --name User --attributes name:string,email:string,password:string,role:string**

``// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Reemplaza con la ruta correcta a tu archivo de configuración

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Otros campos del modelo
  },
  {
    // Otras opciones del modelo
  }
);

module.exports = User;
``

# Luego con el siguente comando ya se crearian las tablas en la base de datos 

**sequelize db:migrate**

# 4 Sincronización de modelos con la base de datos: Luego de definir tus modelos, necesitas sincronizarlos con la base de datos para que se creen las tablas correspondientes. Puedes hacerlo en la carpeta de rutas de tu aplicación:
``
const express = require('express')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()


router.post('/createUser', UserController.create)
router.post("/login", UserController.login)
router.get("/findUserByIdWithOrdersProducts/:id", UserController.getUserByIdWithOrderProduct)
router.delete("/logout/:id", authentication, UserController.logout)
router.get("/confirm/:emailToken,", UserController.confirm)

module.exports = router;
``
**Creando los endpoints necesarios en la carpeta _controllers_**
``
const { User, OrderProduct, Order, Product, Token, Sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']
const { Op } = Sequelize;
const transporter = require("../config/nodemailer");

const UserController = {

    async create(req, res, next) {
        req.body.role = "user";

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
module.exports = UserController
``
## Construido con 🛠️

* [Visual Studio Code](https://code.visualstudio.com) - El framework para crear aplicaciones web 
* [NodeJS](https://www.npmjs.com) - Sistema gestion de paquetes
* [Express](https://www.npmjs.com/package/express) - Node  usada
* [MySQL] (https://www.mysql.com/) -Base de datos
* [Sequelize] (https://www.sequelize.org/) -Base de datos

## Autores ✒️ 

* **Volodymyr Kolomiiets** - *Ejercicios* - [VolodymyrKolomiets](https://github.com/VolodymyrKolomiets)