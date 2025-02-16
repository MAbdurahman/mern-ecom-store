import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from '../../components/common/CommonForm.jsx';
import {signUpFormControls} from '@/config/index.js';
import useNotification from '@/hooks/useNotification.jsx';
import {validateUserInfo} from '@/utils/functionUtils.js';

const initialState = {
   userName: "",
   email: "",
   password: "",
};

export default function SignUp() {
   const [formData, setFormData] = useState(initialState);
   const navigate = useNavigate();
   const {updateNotification} = useNotification();
   const { userName, email, password } = formData;
   const {isValid, error} = validateUserInfo(userName, email, password);


   function handleSubmit() {
      console.log('Submit');
   }

   return (
      <div className="mx-auto w-full max-w-md space-y-6">
         <div className="text-center">
            <h2 className="text-2xl font-semibold font-head uppercase text-foreground">
               Sign Up
            </h2>
         </div>
         <CommonForm
            formControls={signUpFormControls}
            buttonText={"SIGN UP"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
         />
         <p className="mt-2 text-right">
            Already have an account?
            <Link
               className="font-medium ml-2 text-primary hover:underline"
               to='/auth/sign-in'
            >
               Sign In
            </Link>
         </p>
      </div>
   );
}