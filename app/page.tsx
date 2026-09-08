import {auth} from "@/lib/auth/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const result = await auth.getSession()
  // DEBUGGING 

console.log("SESSION:", result);


//   if (!user){
//     redirect("/auth/sign-up")
//   }
 return (
  <div className="h-screen bg-linear-to-br from-purple-50 to-purple-100 flex justify-center items-center">
    Hello Inventory Managment App
  </div>
 )
}
