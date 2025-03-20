import express from 'express';
import {handleImageUploadedFile, addProduct, deleteProduct,
   updateProduct, getAllProducts} from '../../controllers/admin/adminProductController.js';
import {upload} from '../../config/configCloudinary.js';

const router = express.Router();

/************************* routes *************************/
router.post('/upload-image', upload.single('my_file'), handleImageUploadedFile);
router.post('/add-product', addProduct);
router.put('/update-product/:productId', updateProduct);
router.delete('/delete-product/:productId', deleteProduct);
router.get('/get-products', getAllProducts);

export default router;