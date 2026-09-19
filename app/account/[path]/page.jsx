// const page = async ({ params }) => {
//   const { path } = await params;
//   console.log(path);

//   return <div>ACCOUNT FOR : {path}</div>;
// };

// export default page;
import SideBare from "@/components/SideBare";
import { AccountView } from "@neondatabase/auth-ui";
import { accountViewPaths } from "@neondatabase/auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({ params }) {
  const { path } = await params;

  console.log(path);

  return (
    <div>
      <SideBare />
      <main className=" p-8 ml-48">
        <AccountView path={path} />
      </main>
    </div>
  );
}

// : {
//   params: Promise<{ path: string }>;
// }
