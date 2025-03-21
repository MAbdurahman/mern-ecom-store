import Product from '../../models/productModel.js';
import {imageUploadedFile} from '../../config/configCloudinary.js';
import {messageHandler} from '../../utils/messageHandlerUtils.js';


export const handleImageUploadedFile  = async (req, res) => {
   try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const url = 'data:' + req.file.mimetype + ';base64,' + b64;
      const result = await imageUploadedFile(url);

      res.json({
         message: 'Image uploaded successfully.',
         success: true,
         statusCode: 200,
         result
      });

   } catch (err) {
      console.error('Error in handleImageUploadedFile: ', err.message);
      return messageHandler(res, 'handleImageUploadedFile Error: ' + err.message, false, 500);

   }
}

export const addProduct = async (req, res) => {
   const {
      title,
      image,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview
   } = req.body;
   try {
      if (!image) {
         return messageHandler(res, 'Please upload a product image!', false, 400);
      }
      if (!title) {
         return messageHandler(res, 'Please enter a product title!', false, 400);
      }
      if (!description) {
         return messageHandler(res, 'Please enter a product description!', false, 400);
      }
      if (!category) {
         return messageHandler(res, 'Please select a product category!', false, 400);
      }
      if (!brand) {
         return messageHandler(res, 'Please select a product brand!', false, 400);
      }
      if (!price) {
         return messageHandler(res, 'Please enter a product price!', false, 400);
      }
      if (!salePrice) {
         return messageHandler(res, 'Please enter a value for the product sale price!', false, 400);
      }

      if (!totalStock) {
         return messageHandler(res, 'Please enter a total product in stock!', false, 400);
      }


      const newProduct = new Product(
         title,
         description,
         category,
         brand,
         image,
         price,
         salePrice,
         totalStock,
         averageReview
      )

      await newProduct.save();
      // messageHandler(res, 'Product successfully created!', true, 201, newProduct);
      res.status(201).json({
         message: 'Product successfully created!',
         success: true,
         data: newProduct
      })

   } catch (err) {
      console.error('Error adding a product: ', err.message);
      return messageHandler(res, 'Error adding a product: ' + err.message, false, 500);
   }
}

export const getAllProducts = async (req, res) => {
   try {
      const allProducts = await Product.find({});

      // if (allProducts) {
      //    messageHandler(res,'Successfully retrieved all products!', true, 200, allProducts);
      // }
      res.status(200).json({
         message: 'Successfully retrieved all products!',
         success: true,
         data: allProducts
      })

   } catch (err) {
      console.error('Error getting all products: ', err.message);
      return messageHandler(res, 'Error getting all products: ' + err.message, false, 500);
   }
}

export const updateProduct = async (req, res) => {
   const {productId} = req.params;
   const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,} = req.body;

   try {
      const foundProduct = await Product.findById(productId);
      if (!foundProduct) {
         return messageHandler(res, 'Product not found!', false, 404);
      }

      foundProduct.title = title || foundProduct.title;
      foundProduct.description = description || foundProduct.description;
      foundProduct.category = category || foundProduct.category;
      foundProduct.brand = brand || foundProduct.brand;
      foundProduct.price = price === "" ? 0 : price || foundProduct.price;
      foundProduct.salePrice =
         salePrice === "" ? 0 : salePrice || foundProduct.salePrice;
      foundProduct.totalStock = totalStock || foundProduct.totalStock;
      foundProduct.image = image || foundProduct.image;
      foundProduct.averageReview = averageReview || foundProduct.averageReview;

      await foundProduct.save();
      // messageHandler(res, 'Product successfully updated!', true, 200, foundProduct,);
      res.status(200).json({
         message: 'Successfully updated!',
         success: true,
         data: foundProduct
      })

   } catch(err) {
      console.error('Error editing product: ', err.message);
      return messageHandler(res, 'Error editing product: ' + err.message, false, 500);
   }
}

export const deleteProduct = async (req, res) => {
   const {productId} = req.params;

   try {
      const productToDelete = Product.findByIdAndDelete(productId);
      if (!productToDelete) {
         return messageHandler(res, 'Product not found!', false, 404);
      }
      messageHandler(res, 'Product successfully deleted!', true, 200);

   } catch(err) {
      console.error('Error deleting a product: ', err.message);
      return messageHandler(res, 'Error deleting a product: ' + err.message, false, 500);
   }
}