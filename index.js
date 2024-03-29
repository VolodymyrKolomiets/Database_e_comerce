const express = require('express')
const app = express()
const PORT = 8080
const {typeError}  = require('./middlewares/errors')
const cors = require("cors")

app.use(cors())
app.use(express.static("./upload"))
app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'))
app.use(typeError)

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))