const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
   

const products_get_all = (req, res, next) => {
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
}

const products_create_product = (req, res, next) => {

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

}

const products_get_product = (req, res, next) => {
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
}

const products_update_product = (req, res, next) => {
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
}

const products_delete = (req, res, next) => {
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
}



module.exports = { products_get_all, products_create_product,  products_get_product, products_update_product, products_delete}