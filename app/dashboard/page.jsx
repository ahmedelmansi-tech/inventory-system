"use client";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const signOutFn = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      console.log("ERROR".bgRed, error);
      return;
    }
    router.push("/auth/sign-in");
  };

  return (
    <div className="h-screen bg-linear-to-br from-purple-300 to-purple-500 flex justify-center items-center gap-3">
      <h2>DASHBOARD INTERFACE</h2>
      <button className="btn btn-error text-gray-300" onClick={signOutFn}>
        Sign Out
      </button>
    </div>
  );
};

export default page;
