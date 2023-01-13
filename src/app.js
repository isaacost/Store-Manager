const express = require('express');

const productsController = require('./controllers/products.controller');
const { validateProductName } = require('./middlewares/validateProductName');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);
app.post('/products', validateProductName, productsController.create);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;