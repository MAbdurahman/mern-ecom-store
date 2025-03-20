/************************* imports *************************/
import mongoose, {Schema} from 'mongoose';

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
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
   },
   {timestamps: true}
);

const Product = mongoose.model( 'product', productSchema );
export default Product;