"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _utlis = require("../utlis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async (req, res) => {
  const products = await _productModel.default.find({});
  res.send(products);
});
router.get('/:id', async (req, res) => {
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(400).send({
      msg: 'product not found'
    });
  }
});
router.put('/:id', _utlis.isAuth, _utlis.isAdmin, async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.catagory = req.body.catagory;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.description = req.body.description;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
    product.countQty = req.body.countQty;
    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res.status(200).send({
        msg: 'product updated',
        data: updatedProduct
      });
    }
  }

  return res.status(500).send({
    msg: 'Erro in Update Product'
  });
});
router.delete('/:id', _utlis.isAuth, _utlis.isAdmin, async (req, res) => {
  const deletedProduct = await _productModel.default.findByIdAndDelete(req.params.id);

  if (deletedProduct) {
    res.status(200).send({
      msg: 'successfully deleted product'
    });
  } else {
    return res.status(500).send({
      msg: 'Error in deletion'
    });
  }
});
router.post('/', _utlis.isAuth, _utlis.isAdmin, async (req, res) => {
  const product = new _productModel.default({
    name: req.body.name,
    catagory: req.body.catagory,
    image: req.body.image,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    countQty: req.body.countQty
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).send({
      msg: 'new product created',
      data: newProduct
    });
  } else {
    return res.status(401).send({
      msg: 'product creation faild'
    });
  }
});
var _default = router;
exports.default = _default;