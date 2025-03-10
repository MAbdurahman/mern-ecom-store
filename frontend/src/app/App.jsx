import { Button } from "@/components/ui/button";

export default function App() {

   return (
      <div className="flex flex-col items-center justify-center min-h-svh">
         <h2 className="uppercase mb-2">mern-ecom-store</h2>
         <Button variant="default" className="font-semibold mt-1 cursor-pointer">click me</Button>
      </div>

   );
}