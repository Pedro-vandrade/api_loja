import pool from '../config/database.js'
class ProdutoController {
    async index (req, res)  {
        try {
            const result = await pool.query("SELECT * FROM store.produtos;");
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
    
    
    async buscarPorId (req, res) {
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

    async buscarPorCategoria(req, res) {
        const { categoria } = req.params;
    
        if (typeof categoria !== "string") {
            return res.status(400).json({ erro: "O parâmetro categoria deve ser um texto" });
        }
    
        try {
            const result = await pool.query(
                "SELECT * FROM store.produtos WHERE LOWER(categoria) = LOWER($1);",
                [categoria]
            );
    
            if (result.rowCount > 0) {
                res.status(200).json(result.rows)
            } else {
                res.status(404).json({ erro: "Categoria não encontrada" })
            }
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
    

    async inserir (req, res) {
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