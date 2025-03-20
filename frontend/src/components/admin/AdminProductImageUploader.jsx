import { useEffect, useRef } from "react";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function AdminProductImageUploader({  imageFile,
                                                     setImageFile,
                                                     imageLoadingState,
                                                     setImageLoadingState,
                                                     uploadedImageURL,
                                                     setUploadedImageURL,
                                                     isEditMode,
                                                     isCustomStyling = false,}) {

   const inputRef = useRef(null);

   function handleImageChange(e) {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
         setImageFile(selectedFile);
      }
   }

   function handleOnDragOver(e) {
      e.preventDefault();
   }

   function handleOnDrop(e) {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files?.[0];

      if (droppedFile) {
         setImageFile(droppedFile);
      }
   }

   function handleRemoveImage(e) {
      setImageFile(null);
      if (inputRef.current) {
         inputRef.current.value = "";
      }
   }

   async function handleUploadImageToCloudinary() {
      try {
         setImageLoadingState(true);
         const data = new FormData();
         data.append("my_file", imageFile);
         data.append('upload_preset', 'mern-ecom-store');
         const response = await axios.post(
            "http://localhost:5000/api/v1.0/admin/products/upload-image",
            data
         );
         console.log(response.data.result.url);
         if (response?.data?.success) {
            setUploadedImageURL(response.data.result.url);
            setImageLoadingState(false);
         }

      } catch(err) {
         console.error('Error uploading image file ', err);
         return null;
      }

   }

   useEffect(() => {
      if (imageFile !== null) {
         handleUploadImageToCloudinary().then(r =>{});
      }
   },[imageFile])

   return (
      <div
         className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
      >
         <Label className="text-lg font-semibold pl-2 mb-2 block">Upload Image</Label>
         <div
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            className={`${
               isEditMode ? "opacity-60" : ""
            } border-2 border-dashed rounded-md p-4`}
         >
            <Input
               id="image-upload"
               type="file"
               className="hidden"
               ref={inputRef}
               onChange={handleImageChange}
               disabled={isEditMode}
            />
            {!imageFile ? (
               <Label
                  htmlFor="image-upload"
                  className={`${
                     isEditMode ? "cursor-not-allowed" : ""
                  } flex flex-col items-center justify-center h-32 cursor-pointer`}
               >
                  <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                  <span>Drag & drop or click to upload image</span>
               </Label>
            ) : imageLoadingState ? (
               <Skeleton className="h-10 bg-neutral-700" />
            ) : (
               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <FileIcon className="w-8 h-8 text-primary mr-2" />
                  </div>
                  <p className="text-sm font-medium">{imageFile.name}</p>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="text-muted-foreground hover:text-foreground"
                     onClick={handleRemoveImage}
                  >
                     <XIcon className="w-4 h-4" />
                     <span className="sr-only">Remove File</span>
                  </Button>
               </div>
            )}
         </div>
      </div>
   );
}