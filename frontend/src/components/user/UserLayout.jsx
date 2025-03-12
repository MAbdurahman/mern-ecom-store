import {Outlet} from 'react-router-dom';
import UserHeader from './UserHeader';

export default function UserLayout() {

   return (
      <div className="flex flex-col bg-white overflow-hidden">
         <UserHeader />
         <main className="flex flex-col w-full">
            <Outlet />
         </main>
      </div>
   );
}