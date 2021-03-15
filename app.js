const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let path = require('path')

// 引入路由
const productRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const userRouters = require('./api/routes/user');
const categoryRouters = require('./api/routes/category');
const exerciseRouters = require('./api/routes/exercise');
const commentRouters = require('./api/routes/comment');
const likeRouters = require('./api/routes/like');

// 连接mongoose，restful为数据库名称
mongoose.connect('mongodb://localhost:27017/restful', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})


mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 加上这句后
  // /uploads//2020-06-29T15-54-29.275ZproductImage.jpg 就能直接访问到了
  // 待理解
// 用作对静态文件的访问
app.use('/uploads', express.static('uploads'));





app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Access, Authorization, X-Token"
  );
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
    return res.status(200).json({});
  }
  next();
})

// Routes which should handle requests 
// 把路由作为中间件
app.use('/api/products', productRoutes)
app.use('/api/orders', ordersRouter)
app.use('/api/user', userRouters)
app.use('/api/category', categoryRouters)
app.use('/api/exercise', exerciseRouters)
app.use('/api/comment', commentRouters)
app.use('/api/likes', likeRouters)



module.exports = app;

