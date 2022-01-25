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
              url: 'http://8.129.106.56/api/products' + doc._id
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

  console.log(req.files, 'req.files')

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.files[0].path
    
  });

  product
    .save()
    .then(result => {
      let transferString = result.productImage && result.productImage.replace('/\//g','/')
      console.log(transferString, 'transferstring')
      res.status(201).json({
        message: "created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          productImage: `http://8.129.106.56/api/products/${transferString}`,
          request: {
            type: 'GET',
            url: 'http://8.129.106.56/api/products/' + result._id
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


const products_create_product_urlImage = (req, res, next) => {
  console.log(req, 'req')
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  })

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'created product successful'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

const products_get_product_limit = async (req, res, next) => {
  const { page, pageCount } = req.body;
  const count = await Product.find();
  Product.find()
    .limit(pageCount)
    .skip(pageCount * page)
    .then(docs => {
      const response = {
        count: docs.length,
        page: page,
        docs,
        totalCount: count.length
      }
      res.status(201).json(response)
    })
    .catch(error => {
      res.status(500).json({
        error: error
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
            url: 'http://8.129.106.56/api/products'
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
          url: 'http://8.129.106.56/api/products/' + id
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
          url: 'http://8.129.106.56/api/products',
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



module.exports = { 
  products_get_all, 
  products_create_product,  
  products_get_product, 
  products_update_product, 
  products_delete,
  products_create_product_urlImage,
  products_get_product_limit
}