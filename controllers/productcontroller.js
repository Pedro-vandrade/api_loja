import pool from '../config/database.js';

class ProdutoController {
    async index (req, res)  {
        try {
            const result = await pool.query("SELECT * FROM store.produtos;");
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    async showById (req, res) {
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
    }

    async insert (req, res) {
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
    }

    async update (req, res) {
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
    }
    
    async delete  (req, res) {
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
    }

}

export default new ProdutoController()