const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

app.get('/api/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  res.json(products);
});


app.post('/api/requestProduct', (req, res) => {
  const productId = req.body.productId;
  res.json({ message: `Product request received for productId: ${productId}` });
});
// this endpoint i create because the postman didn't work with me 
app.get('/add-product', (req, res) => {
    res.sendFile(__dirname + '/public/add-product.html');
  });
  
app.post('/api/addProduct', (req, res) => {
  const newProduct = req.body;
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  products.push(newProduct);
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  res.json({ message: 'Product added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



