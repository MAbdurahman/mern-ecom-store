import {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useNotification from '@/hooks/useNotification.jsx';
import CommonForm from '@/components/common/CommonForm.jsx';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {addProductFormElements} from '@/config/index.js';
import AdminProductImageUploader
   from '@/components/admin/AdminProductImageUploader.jsx';
import {
   addProduct,
   updateProduct,
   getAllProducts,
   deleteProduct
} from '@/store/admin/adminProductSlice.js';

const initialFormData = {
   title: '',
   image: '',
   description: '',
   category: '',
   brand: '',
   price: '',
   salePrice: '',
   totalStock: '',
   averageReview: 0
};

export default function AdminProducts() {
   const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
   const [formData, setFormData] = useState({});
   const [imageFile, setImageFile] = useState(null);
   const [uploadedImageURL, setUploadedImageURL] = useState('');
   const [imageLoadingState, setImageLoadingState] = useState(false);
   const [currentEditedId, setCurrentEditedId] = useState(null);


   const dispatch = useDispatch();
   const { productList } = useSelector((state) => state.adminProduct);
   const {updateNotification} = useNotification();

   async function handleSubmit(event) {
      event.preventDefault();
      console.log('handleSubmit', event.target.event);
   }

   async function handleDeleteProduct(productId) {
      console.log('handleDeleteProduct', productId);

   }

   function handleIsFormValid() {
      return Object.keys(formData)
         .filter((currentKey) => currentKey !== 'averageReview')
         .map((key) => formData[key] !== '')
         .every((item) => item);
   }

   useEffect(() => {
      dispatch(getAllProducts());

   }, [dispatch]);

   console.log('productList', productList);

   return (
      <Fragment>
         <div className="mb-5 w-full font-semibold flex justify-end cursor-pointer">
            <Button className="cursor-pointer"
                    onClick={() => setOpenCreateProductsDialog(true)}>
               Add Product
            </Button>
         </div>
         <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
         </div>
         <Sheet
            open={openCreateProductsDialog}
            onOpenChange={() => {
               setOpenCreateProductsDialog(false);
               setCurrentEditedId(null);
               setFormData(initialFormData);
            }}
         >
            <SheetContent side="right" className="overflow-auto">
               <SheetHeader className="p-4 pl-2">
                  <SheetTitle className="text-xl font-semibold text-gray-900">
                     {currentEditedId !== null ? 'Edit Product' : 'Add Product'}
                  </SheetTitle>
               </SheetHeader>
               <AdminProductImageUploader
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageURL={uploadedImageURL}
                  setUploadedImageURL={setUploadedImageURL}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isEditMode={currentEditedId !== null}
               />
               <div className="py-6 px-2">
                  <CommonForm
                     onSubmit={handleSubmit}
                     formData={formData}
                     setFormData={setFormData}
                     buttonText={currentEditedId !== null ? 'Edit Product' : 'Add Product'}
                     formControls={addProductFormElements}
                     isBtnDisabled={!handleIsFormValid()}
                  />
               </div>
            </SheetContent>
         </Sheet>
      </Fragment>
   );
}