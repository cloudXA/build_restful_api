const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// 引入路由
const productRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const userRouters = require('./api/routes/user');

// 连接mongoose
mongoose.connect('mongodb://localhost:27017/restful', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})


mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 加上这句后
// http://localhost:3000/uploads//2020-06-29T15-54-29.275ZproductImage.jpg 就能直接访问到了
// 待理解
app.use('/uploads', express.static('uploads'));

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
// 把路由作为中间件
app.use('/products', productRoutes)
app.use('/orders', ordersRouter)
app.use('/user', userRouters)

module.exports = app;