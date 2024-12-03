import express from 'express'
const app = express()

app.use(express.json())

const produtos =[
    {id: 1, produto: "Adidas Gazelle", preco: 599.00, categoria: "Calçado"},
    {id: 2, produto: "Adidas Samba", preco: 699.00, categoria: "Calçado"},
    {id: 3, produto: "Nike AirMax", preco: 899.00, categoria: "Calçado"},
    {id: 4, produto: "Camisa Seleção Brasil", preco: 359.00, categoria: "Vestuário"},
    {id: 5, produto: "HipBag Nike ", preco: 189.00, categoria: "Acessórios"}
]

function buscarProdutoPorId(id){
    return produtos.filter(produto => produto.id == id)
}

function buscarIndexProduto(id){
    return produtos.findIndex(produto => produto.id == id)
}

app.get('/', (req, res) => {
    res.send('Loja de Roupas')
})

app.get('/produtos', (req, res) => {
   // res.send('Esta é a página de produtos.')
    res.status(200).send(produtos)
})

app.get('/produtos/:id', (req, res) => {
    res.json(buscarProdutoPorId(req.params.id))
})

app.post('/produtos', (req, res)=> {
    // inserindo informações na lista produtos através da requisição (req)
    produtos.push(req.body)
    res.status(201).send("Produto inserido com sucesso!")
})

app.delete('/produtos/:id', (req, res) => {
    let index = buscarIndexProduto(req.params.id)
    produtos.splice(index, 1)
    res.send(`Produto com id ${req.params.id} excluído com sucesso.`)
})

app.put('/produtos/:id', (req, res) => {
    let index = buscarIndexProduto(req.params.id)
    produtos[index].produto = req.body.produto
    produtos[index].preco = req.body.preco
    produtos[index].categoria = req.body.categoria
    res.json(produtos)
    // res.send(`Produto com id ${req.params.id} atualizado com sucesso.`)
})

export default app