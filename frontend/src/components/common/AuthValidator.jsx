import {Navigate, useLocation} from 'react-router-dom';
import {Fragment} from 'react';


export default function AuthValidator({isAuthenticated, user, children }) {
   const location = useLocation();

   // console.log(location.pathname, isAuthenticated);

   if (location.pathname === '/') {
      if (!isAuthenticated) {
         return <Navigate to='/auth/sign-in' />;
      } else {
         if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />;
         } else {
            return <Navigate to='/shopper/home' />;
         }
      }
   }

   if (!isAuthenticated &&
      !(location.pathname.includes('/sign-in') || location.pathname.includes('/sign-up'))
   ) {
      return <Navigate to='/auth/sign-in' />;
   }

   if (isAuthenticated && (location.pathname.includes('/sign-in') ||
      location.pathname.includes('/sign-up'))) {

      if (user?.role === 'admin') {
         return <Navigate to='/admin/dashboard' />;

      } else {
         return <Navigate to='/shopper/home' />;

      }
   }

   if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
      return <Navigate to='/forbidden' />;
   }

   if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shopper')) {
      return <Navigate to='/admin/dashboard' />;
   }

   return (
      <Fragment>
         {children}
      </Fragment>

   );
}