const express = require('express');
const app = express();
// 在本地可以查看请求连接的信息
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Access, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
    return res.status(200).json({});
  }
  next();
})

// Routes which should handle requests 
// 用于处理请求的路由
app.use('/products', productRoutes)
app.use('/orders', ordersRouter)

module.exports = app;