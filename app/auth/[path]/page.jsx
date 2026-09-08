import { AuthView } from "@neondatabase/auth-ui";
// import { AuthViewPaths } from "@neondatabase/auth-ui/server";
import { auth } from "@/lib/auth/server";

const page = async ({ params }) => {
  const { path } = await params;
  const { data: session } = await auth.getSession();

  console.log(session);
  return (
    <div className="h-screen bg-gray-400 flex justify-center items-center">
      <AuthView path={path} />
    </div>
  );
};

export default page;
