import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from '../components/auth/AuthLayout.jsx';
import SignIn from '../pages/auth/SignIn.jsx';
import SignUp from '../pages/auth/SignUp.jsx';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminProducts from '../pages/admin/AdminProducts.jsx';
import AdminOrders from '../pages/admin/AdminOrders.jsx';
import AdminFeatures from '../pages/admin/AdminFeatures.jsx';
import UserLayout from '../components/user/UserLayout.jsx';
import UserHome from '../pages/user/UserHome.jsx';
import UserProductsListing from '../pages/user/UserProductsListing.jsx';
import UserCheckout from '../pages/user/UserCheckout.jsx';
import UserAccount from '../pages/user/UserAccount.jsx';
import UserPaypalReturn from '../pages/user/UserPaypalReturn.jsx';
import UserPaymentSuccess from '../pages/user/UserPaymentSuccess.jsx';
import UserProductSearch from '../pages/user/UserProductSearch.jsx';
import NotFoundError from '../pages/error/NotFoundError.jsx';
import UnauthorizedError from '../pages/error/UnauthorizedError.jsx';
import AccessValidator from '../components/common/AccessValidator.jsx';
import NoResultsError from '../pages/error/NoResultsError.jsx';


export default function App() {
   const { user, isAuthenticated, isLoading } = useSelector(
      (state) => state.auth
   );
   const dispatch = useDispatch();

   useEffect(() => {
      console.log('useEffect');
   }, [dispatch]);


   return (
      <div className="flex flex-col overflow-hidden bg-white">
         {/*<h1>Header Component</h1>*/}
         <Routes>
            <Route path="/auth" element={
               <AccessValidator isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout/>
               </AccessValidator>}>
               <Route path="sign-in" element={<SignIn/>}/>
               <Route path="sign-up" element={<SignUp/>}/>
            </Route>
            <Route path={'/admin'} element={
               <AccessValidator isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout/>
               </AccessValidator>}>
               <Route path="dashboard" element={<AdminDashboard/>}/>
               <Route path="products" element={<AdminProducts/>}/>
               <Route path="orders" element={<AdminOrders/>}/>
               <Route path="features" element={<AdminFeatures/>}/>
            </Route>
            <Route path="user" element={
               <AccessValidator isAuthenticated={isAuthenticated} user={user}>
                  <UserLayout/>
               </AccessValidator>}>
               <Route path="home" element={<UserHome/>}/>
               <Route path="listing" element={<UserProductsListing/>}/>
               <Route path="checkout" element={<UserCheckout/>}/>
               <Route path="account" element={<UserAccount/>}/>
               <Route path="paypal-return" element={<UserPaypalReturn/>}/>
               <Route path="payment-success" element={<UserPaymentSuccess/>}/>
               <Route path="search" element={<UserProductSearch/>}/>
            </Route>
            <Route path={'/unauthorized'} element={<UnauthorizedError/>}/>
            <Route path={'/no-results'} element={<NoResultsError/>}/>
            <Route path="*" element={<NotFoundError/>}/>

         </Routes>

      </div>
   );
}