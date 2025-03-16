
export const signUpFormControls = [
   {
      name: "username",
      label: "Full name",
      placeholder: "Enter full name",
      componentType: "input",
      type: "text",
   },
   {
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      componentType: "input",
      type: "text",
   },
   {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      componentType: "input",
      type: "password",
   },
];

export const signInFormControls = [
   {
      name: "email",
      label: "Email",
      placeholder: "example@email.com",
      componentType: "input",
      type: "text",
   },
   {
      name: "password",
      label: "Password",
      placeholder: "Your password",
      componentType: "input",
      type: "password",
   },
];

export const addProductFormElements = [
   {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
   },
   {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
   },
   {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
         { id: "men", label: "Men" },
         { id: "women", label: "Women" },
         { id: "kids", label: "Kids" },
         { id: "accessories", label: "Accessories" },
         { id: "footwear", label: "Footwear" },
      ],
   },
   {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
         { id: "nike", label: "Nike" },
         { id: "adidas", label: "Adidas" },
         { id: "puma", label: "Puma" },
         { id: "levi", label: "Levi's" },
         { id: "zara", label: "Zara" },
         { id: "h&m", label: "H&M" },
      ],
   },
   {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
   },
   {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
   },
   {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
   },
];