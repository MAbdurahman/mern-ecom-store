import {Outlet} from 'react-router-dom';

export default function AuthLayout() {

   return (
      <div className="flex min-h-screen w-full">
         <div className="hidden lg:flex items-center justify-center bg-neutral-700 w-1/2 px-12">
            <div className="max-w-md space-y-6 text-center text-primary-foreground">
               <h3 className="text-2xl font-semibold font-head text-neutral-100 tracking-wider">
                  Welcome to
               </h3>
               <h1 className="text-4xl font-extrabold text-neutral-000 tracking-tight">
                  ECommerce Store
               </h1>
            </div>
         </div>
         <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <Outlet />
         </div>
      </div>

   );
}