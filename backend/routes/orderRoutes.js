import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../utlis';
var mongoose = require('mongoose');

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  if (orders.length) {
    res.status(200).send(orders);
  } else {
    res.status(400).send({ msg: 'no order found' });
  }
});

router.get('/mine', isAuth, async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  if (orders.length) {
    res.status(200).send(orders);
  } else {
    res.status(400).send({ msg: 'no order found' });
  }
});

router.get('/:id', isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.status(200).send(order);
  } else {
    res.status(401).send({ msg: 'order not found' });
  }
});

router.delete('/:id', isAuth, async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (deletedOrder) {
    res.status(200).send({ msg: 'order is deleted' });
  } else {
    res.status(400).send({ msg: 'order deletion failed' });
  }
});

router.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemPrice: req.body.itemPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ msg: 'New Order Created', data: newOrderCreated });
});

router.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log('from server', order);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentmethod: 'paypal',
    };
    const updatedOrder = await order.save();
    res.send({ msg: 'Order Paid', order: updatedOrder });
  } else {
    res.status(400).send({ msg: 'Order not found' });
  }
});

export default router;
