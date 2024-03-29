const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
// const path = require('path')
const checkAuth = require('../middleware/check-auth');
const Product = require('../models/product');


const ProductsController = require('../controllers/products');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
}) 

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype, 'file mimetype ')
  // reject a file 
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, false);
  } else {
    cb(null, true);
  }
}

const uploads = multer({
  storage: storage, 
  limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.get('/',  ProductsController.products_get_all)

// 接受一个以 productImage 命名的文件。这个文件的信息保存在 req.file。
// router.post('/', checkAuth, uploads.single('productImage'), ProductsController.products_create_product)


// 经过处理，使用uploads.any()可以上传任意命名的图片格式了
router.post('/', uploads.any(), ProductsController.products_create_product)


// 创建产品（带有image url）
router.post('/create_products', ProductsController.products_create_product_urlImage)
// 获取产品（分页）
router.post('/get_product', ProductsController.products_get_product_limit)


router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete)

module.exports = router;