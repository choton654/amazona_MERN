"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _utlis = require("../utlis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

const router = _express.default.Router();

router.get('/', _utlis.isAuth, async (req, res) => {
  const orders = await _orderModel.default.find({}).populate('user');

  if (orders.length) {
    res.status(200).send(orders);
  } else {
    res.status(400).send({
      msg: 'no order found'
    });
  }
});
router.get('/mine', _utlis.isAuth, async (req, res) => {
  const orders = await _orderModel.default.find({
    user: req.user._id
  });

  if (orders.length) {
    res.status(200).send(orders);
  } else {
    res.status(400).send({
      msg: 'no order found'
    });
  }
});
router.get('/:id', _utlis.isAuth, async (req, res) => {
  const order = await _orderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    res.status(200).send(order);
  } else {
    res.status(401).send({
      msg: 'order not found'
    });
  }
});
router.delete('/:id', _utlis.isAuth, async (req, res) => {
  const deletedOrder = await _orderModel.default.findByIdAndDelete(req.params.id);

  if (deletedOrder) {
    res.status(200).send({
      msg: 'order is deleted'
    });
  } else {
    res.status(400).send({
      msg: 'order deletion failed'
    });
  }
});
router.post('/', _utlis.isAuth, async (req, res) => {
  const newOrder = new _orderModel.default({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemPrice: req.body.itemPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({
    msg: 'New Order Created',
    data: newOrderCreated
  });
});
router.put('/:id/pay', _utlis.isAuth, async (req, res) => {
  console.log('from server', order);
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentmethod: 'paypal'
    };
    const updatedOrder = await order.save();
    res.send({
      msg: 'Order Paid',
      order: updatedOrder
    });
  } else {
    res.status(400).send({
      msg: 'Order not found'
    });
  }
});
var _default = router;
exports.default = _default;