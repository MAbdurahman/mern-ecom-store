/************************* imports *************************/
import mongoose, {Schema} from 'mongoose';

const productSchema = new mongoose.Schema({
      title: {
         type: String,
         trim: true,
         required: [true, 'Product name is required!'],

      },
      image: String,
      description: {
         type: String,
         trim: true,
         required: [true, 'Product description is required!'],
      },
      category: {
         type: String,
         trim: true,
         required: [true, 'Category is required!'],
      },
      brand: {
         type: String,
         trim: true,
         required: [true, 'Category is required!'],
      },
      price: {
         type: Number,
         trim: true,
         required: [true, 'Product price is required!'],
      },
      salePrice: {
         type: Number,
         trim: true,
      },
      totalStock: {
         type: Number,
         trim: true,
         required: [true, 'Product total stock is required!'],
      },
      averageReview: {
         type: Number,
         trim: true,
      },
      author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
   },
   {timestamps: true}
);

const Product = mongoose.model( 'product', productSchema );
export default Product;