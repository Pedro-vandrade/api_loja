import express from 'express'
import dotenv from 'dotenv'
import pkg from 'pg'

import productcontroller from './controllers/productcontroller.js'

dotenv.config()
const { Pool } = pkg

const app = express()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
})

pool.connect()
    .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
    .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err))

app.use(express.json())

app.get('/produtos',productcontroller.index)

app.get('/produtos/:id', productcontroller.buscarPorId)

app.get('/produtos/categoria/:categoria', productcontroller.buscarPorCategoria)

app.post('/produtos', productcontroller.inserir)

app.put('/produtos/:id', productcontroller.update)

app.delete('/produtos/:id', productcontroller.delete)


export default app