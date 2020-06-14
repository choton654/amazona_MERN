"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shippingSchema = {
  city: {
    type: String,
    required: true
  },
  postalcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
};
const paymentSchema = {
  paymentmethod: {
    type: String,
    required: true
  }
};
const orderItemSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'product',
    required: false
  }
});
const orderSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemPrice: {
    type: Number
  },
  shippingPrice: {
    type: Number
  },
  taxPrice: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Date
  }
}, {
  timestamps: true
});

const order = _mongoose.default.model('Order', orderSchema);

var _default = order;
exports.default = _default;