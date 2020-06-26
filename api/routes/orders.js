const express = require('express');
const router = express.Router();

// Handle incoming  GET request to /orders 
// 处理连入到/orders的GET请求
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quatity: req.body.quatity
  }
  res.status(201).json({
    message: 'Order was created',
    order: order
  })
})

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order was created',
    orderId: req.params.orderId
  })
})

module.exports = router;