import {Fragment} from 'react';
import EclipseLoader from '@/assets/gifs/loader.gif';

export default function Loader() {

   return (
         <div className="min-h-screen bg-neutral-300 grid place-items-center pt-8">
            <img src={EclipseLoader} alt="loading eclipse"/>
         </div>
   );
}