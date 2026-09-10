import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Home() {
  console.log("HOME PAGE RENDERED");

  const { data: Session, error } = await auth.getSession();
  if (error) {
    console.log("ERROR".bgRed, error);
  }
  if (!Session) {
    redirect("/auth/sign-in");
  }

  console.log(Session);

  return (
    <div className="h-screen bg-linear-to-br from-purple-50 to-purple-100 flex justify-center items-center gap-3">
      <h2>Hello Inventory Managment App</h2>
    </div>
  );
}
