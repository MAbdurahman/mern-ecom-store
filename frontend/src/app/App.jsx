import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import SignIn from '@/pages/auth/SignIn.jsx';
import SignUp from '@/pages/auth/SignUp.jsx';
import NotFoundError from '@/pages/errors/NotFoundError.jsx';
import UnauthorizedError from '@/pages/errors/UnauthorizedError.jsx';
import NoResultsError from '@/pages/errors/NoResultsError.jsx';
import ForbiddenError from '@/pages/errors/ForbiddenError.jsx';
import EmptyCartError from '@/pages/errors/EmptyCartError.jsx';

export default function App() {

   return (
      <div className="flex flex-col overflow-hidden bg-white">

         <Routes>
            <Route path="/auth" element={<AuthLayout />}>
               <Route path="sign-in" element={<SignIn/>}/>
               <Route path="sign-up" element={<SignUp/>}/>
            </Route>
            <Route path={'/unauthorized'} element={<UnauthorizedError/>}/>
            <Route path={'/no-results'} element={<NoResultsError/>}/>
            <Route path={'/forbidden'} element={<ForbiddenError/>}/>
            <Route path={'/empty-cart'} element={<EmptyCartError/>}/>
            <Route path="*" element={<NotFoundError/>}/>
         </Routes>


      </div>
   );
}