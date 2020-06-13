import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  catagory: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true, default: 0 },
  rating: { type: String, required: false, default: 0 },
  numReviews: { type: String, required: false, default: 0 },
  countQty: { type: String, required: true, default: 0 },
});

const Product = mongoose.model('product', productSchema);

export default Product;
