/************************* imports *************************/
/*import mongoose from 'mongoose';*/
import {model, Schema} from 'mongoose';


const productSchema = new Schema({
      title: {
         type: String,
         trim: true,
         required: [true, 'Product title is required'],

      },
      image: String,
      description: {
         type: String,
         trim: true,
         required: [true, 'Product description is required'],
      },
      category: {
         type: String,
         trim: true,
         required: [true, 'Category is required'],
      },
      brand: {
         type: String,
         trim: true,
         required: [true, 'Product brand is required'],
      },
      price: {
         type: Number,
         trim: true,
         required: [true, 'Product price is required'],
      },
      salePrice: {
         type: Number,
         trim: true,
         required: [true, 'Product sale is required'],
         default: 0,
      },
      totalStock: {
         type: Number,
         trim: true,
         required: [true, 'Product total is required'],
      },
      averageReview: {
         type: Number,
         trim: true,
         default: 0,
      }
   },
   {timestamps: true}
);

const Product = new model('product', productSchema);
export default Product;