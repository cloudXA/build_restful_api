const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


const OrdersController = require('../controllers/orders');

// Handle incoming  GET request to /orders 
// 处理连入到/orders的GET请求
router.get('/', checkAuth, OrdersController.orders_get_all)

// 关联数据库
router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.ordres_get_order)


router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order)

module.exports = router;