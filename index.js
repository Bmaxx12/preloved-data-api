const express = require('express');
const app = express();
const PORT = 8080;

app.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/product', (req, res) => {
    res.status(200).send(
        {
            id: 1,
            name: "Tas",
            price: 19.99,
            description: "This is a sample product description."
        }
    );
});

app.post('/product', (req, res) => {
       const {id} = req.params;
       const {name} = req.body;
       const {price} = req.body;
       const {description} = req.body;  
       

});

app.put('/product/:id', (req, res) => {
    res.status(200).send(
        { message: `Product with id ${req.params.id} updated successfully.` } 
    );
});