const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
// const path = require('path')
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
}) 

const fileFilter = (req, file, cb) => {
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

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id productImage') //选择特性的字段作为doc
    .exec()
    .then(docs => {
      const response = {  // 字段封装并返回
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

// 接受一个以 productImage 命名的文件。这个文件的信息保存在 req.file。
router.post('/', checkAuth, uploads.single('productImage'), (req, res, next) => {

  console.log(req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          productImage: result.productImage,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id
          }
        }
      })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })

})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products'
          }
        })
      } else {
        res.status(404).json({message: 'not found'});
      }
      
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
})

router.patch('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  // for...of循环不会遍历对象的key,只会循环出数组的value 可以配合Object.keys()
  for (const ops of Object.keys(req.body)) {
    updateOps[ops] = req.body[ops]
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id
        }
      });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        request: {  // request 为POST该如何
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router;