import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";

export const dynamicParams = false;
export function generateStaticParams() {
  // expect returning an [{path:"/something"}]
  return Object.values(authViewPaths).map((path) => ({ path }));
}
const page = async ({ params }) => {
  const { path } = await params;
  return (
    <div className="h-screen bg-gray-400 flex justify-center items-center">
      <AuthView path={path} />
    </div>
  );
};

export default page;
