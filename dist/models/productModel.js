"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    default: 0
  },
  rating: {
    type: String,
    required: false,
    default: 0
  },
  numReviews: {
    type: String,
    required: false,
    default: 0
  },
  countQty: {
    type: String,
    required: true,
    default: 0
  }
});

const Product = _mongoose.default.model('product', productSchema);

var _default = Product;
exports.default = _default;