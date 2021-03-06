const Order = require('../models/order');
const Product = require('../models/product')
const mongoose = require('mongoose');

// 获取所有订单,(订单会关联到产品)
const orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    // 第一个参数：将关联数据库表详细展示出来，第二个参数：为详细表中的展示的字段
    .populate('product', 'name price')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            quantity: doc.quantity,
            product: doc.product,
            request: {
              type: "GET",
              url: 'http://localhost:3000/orders/' + doc._id
            }
          }
        }),
        
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

// 基于产品，创建新的订单
const orders_create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'page not found'
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'order created',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + result._id
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

// 获取某一具体订单
const ordres_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product', 'name')
    .exec()
    .then(order => {
      if(!order) {
        res.status(404).json({
          message: 'order not found'
        })
      }
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

// 删除某一订单
const orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/orders',
          body: { productId: 'ID', quantity: 'Number' }
        }
      })
    })
}


module.exports = { orders_get_all, orders_create_order, ordres_get_order, orders_delete_order }

