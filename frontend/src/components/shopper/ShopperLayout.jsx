import {Outlet} from 'react-router-dom';
import ShopperHeader from './ShopperHeader.jsx';

export default function ShopperLayout() {

   return (
      <div className="flex flex-col bg-white overflow-hidden">
         <ShopperHeader />
         <main className="flex flex-col w-full">
            <Outlet />
         </main>
      </div>
   );
}