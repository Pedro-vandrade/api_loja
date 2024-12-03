    import express from 'express'
    const app = express()
    import dotenv from 'dotenv';

    dotenv.config()
    import pkg from 'pg';

    const { Pool } = pkg;

    const pool = new Pool({
        host: String(process.env.DB_HOST),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        database: String(process.env.DB_NAME),
        port: Number(process.env.DB_PORT),
    });


    pool.connect()
        .then(() => console.log("Conectado ao PostgreSQL com sucesso!"))
        .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

    app.use(express.json())

    function buscarProdutoPorId(id){
        return produtos.filter(produto => produto.id == id)
    }

    function buscarIndexProduto(id){
        return produtos.findIndex(produto => produto.id == id)
    }

    /*app.get('/', (req, res) => {
        res.send('Loja de Roupas')
    })*/
    // ROTAS 
    app.get('/produtos', async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM store.produtos;");
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    })

    app.get('/produtos/:id', async (req, res) => {
        const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM store.produtos WHERE id = $1;", [id]);
        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ erro: "Produto não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

    app.post('/produtos', async (req, res)=> {
        const { produto, preco, categoria } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO store.produtos (produto, preco, categoria) VALUES ($1, $2, $3) RETURNING *;",
            [produto, preco, categoria]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
})

    app.delete('/produtos/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM store.produtos WHERE id = $1 RETURNING *;", [id]);
            if (result.rowCount > 0) {
                res.status(200).json({ mensagem: `Produto com ID ${id} excluído com sucesso.` });
            } else {
                res.status(404).json({ erro: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    })

    app.put('/produtos/:id', async (req, res) => {
        const { id } = req.params;
        const { produto, preco, categoria } = req.body;
        try {
            const result = await pool.query(
                "UPDATE store.produtos SET produto = $1, preco = $2, categoria = $3 WHERE id = $4 RETURNING *;",
                [produto, preco, categoria, id]
            );
            if (result.rowCount > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ erro: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    })

    export default app