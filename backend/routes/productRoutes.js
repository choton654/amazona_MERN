import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../utlis';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(400).send({ msg: 'product not found' });
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
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
      return res
        .status(200)
        .send({ msg: 'product updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ msg: 'Erro in Update Product' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (deletedProduct) {
    res.status(200).send({ msg: 'successfully deleted product' });
  } else {
    return res.status(500).send({ msg: 'Error in deletion' });
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    catagory: req.body.catagory,
    image: req.body.image,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    countQty: req.body.countQty,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: 'new product created', data: newProduct });
  } else {
    return res.status(401).send({ msg: 'product creation faild' });
  }
});

export default router;
