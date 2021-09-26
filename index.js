const express = require('express')


const products = require('./products')
const app = express()
app.use(express.json())


//reading the data
app.get('/', (req, res) => {
    res.json({ Message: "API is working" })
})
app.get('/api/products', (req, res) => {
    res.json(products)
})

//creating data
app.post('/api/products', (req, res) => {
    if (!req.body.email) {
        res.status(404)
        return res.json({ error: "email is required" })
    }
    const user = {

        id: products.length + 1,
        product_name: req.body.product_name,
        category_product: req.body.category_name,
        email: req.body.email
    }
    products.push(user)
    res.json(user)
})
//update operation
app.put('/api/products/:id', (req, res) => {
    let id = req.params.id
    let product_name = req.body.product_name
    let category_product = req.body.category_name
    let email = req.body.email

    let index = products.findIndex((product) => {
        return (product.id == Number.parseInt(id))
    })

    if (index >= 0) {
        let prod = products[index]
        prod.product_name = product_name
        prod.category_product = category_product
        prod.email = email
        res.json(prod)
    } else {
        res.status(404)
        res.end()
    }

})
//delete operation
app.delete('/api/products/:id' , (req,res) => {
    let id = req.params.id;
    let index = products.findIndex((product) => {
        return (product.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let prod = products[index]
        products.slice(index ,1)
        res.json(prod)
    } else {
        res.status(404)
    }
})
app.listen(3000, () => {
    console.log('listening to the port 3000');
})