/************************* imports *************************/
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
      title: String,
      image: String,
      description: String,
      category: String,
      brand: String,
      price: Number,
      salePrice: Number,
      totalStock: Number,
      averageReview: Number,
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
   },
   {timestamps: true}
);

const Product = new mongoose.model('product', productSchema);
export default Product;