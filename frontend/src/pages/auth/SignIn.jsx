import { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from '@/components/common/CommonForm.jsx';
import {signInFormControls} from '@/config/index.js';
import useNotification from '@/hooks/useNotification.jsx';
import {validateEmailPassword} from '@/utils/functionUtils.js';


const initialState = {
   email: "",
   password: "",
};

export default function SignIn() {
   const [formData, setFormData] = useState(initialState);
   const {updateNotification} = useNotification();
   const {email, password} = formData;
   const {isValid, error} = validateEmailPassword(email, password);

   function handleSubmit(e) {
      e.preventDefault();
      console.log('handleSubmit');
   }

   return (
      <div className="mx-auto w-full max-w-md space-y-6">
         <div className="text-center">
            <h2 className="text-2xl font-semibold font-head uppercase text-foreground">
               Sign In
            </h2>
         </div>
         <CommonForm
            formControls={signInFormControls}
            buttonText={"SIGN IN"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            hasMeter={false}
         />
         <p className="mt-1 text-right">
            Do not have an account?
            <Link
               className="font-medium ml-2 text-primary hover:underline"
               to='/auth/sign-up'
            >
               Sign Up
            </Link>
         </p>
      </div>

   );
}