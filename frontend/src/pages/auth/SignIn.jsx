import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import CommonForm from '@/components/common/CommonForm.jsx';
import {signInFormControls} from '@/config/index.js';
import {signInUser, signUpUser} from '@/store/auth/authSlice.js';
import useNotification from '@/hooks/useNotification.jsx';
import {validateEmailPassword} from '@/utils/functionUtils.js';



const initialState = {
   email: "",
   password: "",
};

export default function SignIn() {
   const [formData, setFormData] = useState(initialState);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {updateNotification} = useNotification();
   const {email, password} = formData;
   const {isValid, error} = validateEmailPassword(email, password);
   let timeOutId = null;

   async function handleSubmit(e) {
      e.preventDefault();
      if (timeOutId) {
         clearTimeout(timeOutId);
      }
      try {

         if (!isValid) {
            return updateNotification('error', error);

         }
         dispatch(signInUser(formData)).then((data) => {
            if (data?.payload?.success) {
               updateNotification('success', data?.payload?.message);

            } else {
               return updateNotification('error', 'Invalid credentials!');

            }

            timeOutId = setTimeout(() => {

            }, 5000);

         });

      } catch(err) {
         return updateNotification('error', err.message);
      }

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