import mongoose from 'mongoose';

const shippingSchema = {
  city: { type: String, required: true },
  postalcode: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
};

const paymentSchema = {
  paymentmethod: { type: String, required: true },
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: false,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    itemPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    delivered: { type: Date },
  },
  { timestamps: true },
);

const order = mongoose.model('Order', orderSchema);

export default order;
