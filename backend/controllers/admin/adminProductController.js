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
   console.log('addProduct');
}




export const getAllProducts = async (req, res) => {
   console.log('getAllProducts');
}



export const updateProduct = async (req, res) => {
   console.log('updateProduct');
}



export const deleteProduct = async (req, res) => {
   console.log('deleteProduct');
}