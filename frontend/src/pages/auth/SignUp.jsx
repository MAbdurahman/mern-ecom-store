import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {signUpUser} from '@/store/auth/authSlice.js';
import {useDispatch} from 'react-redux';
import CommonForm from '../../components/common/CommonForm.jsx';
import {signUpFormControls} from '@/config/index.js';
import useNotification from '@/hooks/useNotification.jsx';
import {validateUserInfo} from '@/utils/functionUtils.js';

const initialState = {
   username: '',
   email: '',
   password: ''
};

export default function SignUp() {
   const [formData, setFormData] = useState(initialState);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {updateNotification} = useNotification();
   const {username, email, password} = formData;
   const {isValid, error} = validateUserInfo(username, email, password);
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

         dispatch(signUpUser(formData)).then((data) => {
            if (data?.payload?.success) {
               console.log(data?.payload?.message);
               updateNotification('success', data?.payload?.message);


            } else {
               return updateNotification('error', 'Email already exists!');
            }

            timeOutId = setTimeout(() => {
               navigate('/' +
                  'auth/sign-in');
            }, 5000);

         });

      } catch (err) {
         return updateNotification('error', err.message);

      }
   }

   return (
      <div className="relative mx-auto w-full max-w-md space-y-6">
         <div className="text-center">
            <h2
               className="text-2xl font-semibold font-head uppercase text-foreground">
               Sign Up
            </h2>
         </div>
         <CommonForm
            formControls={signUpFormControls}
            buttonText={'SIGN UP'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            hasMeter={true}
         />
         <p className="mt-2 text-right">
            Already have an account?
            <Link
               className="font-medium ml-2 text-primary hover:underline"
               to="/auth/sign-in"
            >
               Sign In
            </Link>
         </p>
      </div>
   );
}