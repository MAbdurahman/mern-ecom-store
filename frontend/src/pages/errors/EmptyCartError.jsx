import EmptyCartImage from '@/assets/img/empty-cart.png';


export default function EmptyCartError() {

   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-gray-100">
         <div className="flex flex-col items-center">
            <img className='max-h-32 mb-2' src={EmptyCartImage} alt="Forbidden image sign" />
            <p className="text-2xl font-semibold capitalize tracking-wide text-center  text-gray-600 mb-6">Your cart is empty!</p>
            <a href="shopper/listing"
               className="px-4 py-2 font-semibold uppercase tracking-wider text-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Continue Shopping
            </a>
         </div>
      </div>

   );
}