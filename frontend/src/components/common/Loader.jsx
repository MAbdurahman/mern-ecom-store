import {Fragment} from 'react';
import EclipseLoader from '@/assets/gif/loader.gif';

export default function Loader() {

   return (
         <div className="min-h-screen bg-neutral-100 grid place-items-center pt-8">
            <img src={EclipseLoader} alt="loading eclipse"/>
         </div>
   );
}