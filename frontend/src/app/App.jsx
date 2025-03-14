import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import SignIn from '@/pages/auth/SignIn.jsx';
import SignUp from '@/pages/auth/SignUp.jsx';
import NotFoundError from '@/pages/errors/NotFoundError.jsx';
import UnauthorizedError from '@/pages/errors/UnauthorizedError.jsx';
import NoResultsError from '@/pages/errors/NoResultsError.jsx';
import ForbiddenError from '@/pages/errors/ForbiddenError.jsx';
import EmptyCartError from '@/pages/errors/EmptyCartError.jsx';
import AdminFeatures from '@/pages/admin/AdminFeatures.jsx';
import AdminDashboard from '@/pages/admin/AdminDashboard.jsx';
import AdminProducts from '@/pages/admin/AdminProducts.jsx';
import AdminOrders from '@/pages/admin/AdminOrders.jsx';
import ShopperLayout from '@/components/shopper/ShopperLayout.jsx';
import ShopperHome from '@/pages/shopper/ShopperHome.jsx';
import ShopperProductsList from '@/pages/shopper/ShopperProductsList.jsx';
import ShopperCheckout from '@/pages/shopper/ShopperCheckout.jsx';
import ShopperAccount from '@/pages/shopper/ShopperAccount.jsx';
import ShopperPaypalReturn from '@/pages/shopper/ShopperPaypalReturn.jsx';
import ShopperPaymentSuccess from '@/pages/shopper/ShopperPaymentSuccess.jsx';
import ShopperProductSearch from '@/pages/shopper/ShopperProductSearch.jsx';
import AuthValidator from '@/components/common/AuthValidator.jsx';

export default function App() {

   const isAuthenticated = false;
   const user = {
      /*username: 'John Doe',
      email: 'johndoe@gmail.com',
      role: 'admin'*/

   };

   return (
      <div className="flex flex-col overflow-hidden bg-white">

         <Routes>
            <Route path={'/'} element={<AuthValidator isAuthenticated={isAuthenticated} user={user} />} />
            <Route path={'/auth'} element={<AuthValidator isAuthenticated={isAuthenticated} user={user}> <AuthLayout /> </AuthValidator>}>
               <Route path="sign-in" element={<SignIn/>}/>
               <Route path="sign-up" element={<SignUp/>}/>
            </Route>
            <Route path={'/admin'} element={<AuthValidator isAuthenticated={isAuthenticated} user={user}> <AdminLayout /> </AuthValidator>}>
               <Route path="dashboard" element={<AdminDashboard/>}/>
               <Route path="products" element={<AdminProducts/>}/>
               <Route path="orders" element={<AdminOrders/>}/>
               <Route path="features" element={<AdminFeatures/>}/>
            </Route>
            <Route path={'/shopper'} element={<AuthValidator isAuthenticated={isAuthenticated} user={user}> <ShopperLayout /> </AuthValidator>}>
               <Route path="home" element={<ShopperHome/>}/>
               <Route path="products" element={<ShopperProductsList/>}/>
               <Route path="checkout" element={<ShopperCheckout/>}/>
               <Route path="account" element={<ShopperAccount/>}/>
               <Route path="paypal-return" element={<ShopperPaypalReturn/>}/>
               <Route path="payment-success" element={<ShopperPaymentSuccess/>}/>
               <Route path="search" element={<ShopperProductSearch/>}/>
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