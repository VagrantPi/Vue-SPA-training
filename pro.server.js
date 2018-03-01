const express = require('express');
const port = 80;
const host = '0.0.0.0';

const app = express()

const routes = express.Router();

routes.get('/', (res, req) => {
  req.url = '/index.html';
  next();
})

// mock data
const goods = require('./data/01-商品頁(點菜).json');
const ratings = require('./data/02-商品頁(評價).json');
const seller = require('./data/03-商品頁(商家).json');



routes.get('/goods', (req,res) => {
	res.json(goods);
});
routes.get('/ratings', (req,res) => {
	res.json(ratings);
});

routes.get('/seller', (req,res) => {
	res.json(seller);
});

app.use('/api',routes);

app.use(express.static('./dist'));

module.express = app.listen(port, (err) => {
  if(err) {
    console.log(err);
    return
  }
  console.log('http://localhost:' + port + '/')
})
