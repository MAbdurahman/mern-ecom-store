import {useDispatch} from 'react-redux';
import {Button} from '@/components/ui/button.jsx';
import { AlignJustify, LogOut } from "lucide-react";


export default function AdminHeader({setOpen}) {
   const dispatch = useDispatch();


   async function handleSignOut() {
      console.log('handleSignOut');
   }

   return (
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
         <AlignJustify />
         <span className="sr-only">Toggle Menu</span>
      </Button>
         <div className="flex flex-1 justify-end">
            <Button
               onClick={handleSignOut}
               className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
            >
               <LogOut />
               Sign Out
            </Button>

         </div>
      </header>
   );
}