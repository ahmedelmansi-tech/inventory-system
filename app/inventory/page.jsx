import colors from "colors";
import { Drama } from "lucide-react";
import SideBare from "@/components/SideBare";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/server";
import { deleteProduct, searchProduct } from "@/lib/Actions/product.js";
import { skip } from "node:test";
const page = async ({ currentPath = "/inventory", searchParams }) => {
  // GET THE CURRENT LOGGED USER
  const { data } = await auth.getSession();
  const currentUserID = data?.user?.id;
  // console.log(currentUserID);

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const pageSize = 5;
  const currentPage = Math.max(1, params.page ?? 1);

  console.log("params **** >>>".bgGreen, params);

  const select = {
    name: true,
    sku: true,
    price: true,
    quantity: true,
    id: true,
  };

  const where = {
    userId: currentUserID,
    ...(q
      ? {
          name: {
            contains: q,
            mode: "insensitive",
          },
        }
      : {}),
  };

  // PRODUCTS && PAGINATION
  const [allProducts, numberOfProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      select,
      take: pageSize,
      skip: (currentPage - 1) * pageSize,
    }),
    prisma.product.count({
      where,
    }),
  ]);
  const numberOfPages = Math.max(1, Math.ceil(numberOfProducts / pageSize));
  return (
    <div>
      <SideBare />
      <main className="ml-48 h-screen relative">
        <div className="mb-4 py-3 px-4">
          <div className="font-extrabold text-2xl flex items-center gap-1.5">
            <span>Inventory</span>
            <span className="size-6 rounded-full bg-red-500 text-white text-xs inline-flex items-center justify-center">
              {numberOfProducts}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            here you can
            <span className="text-rotate text-sm ">
              <span className="justify-items-center [&>span]:text-xs [&>span]:mx-2">
                <span>MANAGE</span>
                <span>DELETE</span>
                <span>MONERING</span>
                <span>SCALE</span>
                <span>MAINTAIN</span>
              </span>
            </span>
            your business
          </p>
        </div>
        <form action={searchProduct}>
          <Search numberOfProducts={numberOfProducts} />
        </form>

        <div className="px-3 max-h-3/4 overflow-y-auto">
          {numberOfProducts >= 1 ? (
            <table className="table table-zebra ">
              <thead className="sticky top-0 left-0">
                <tr className="[&>th]:text-sm [&>th]:bg-base-300">
                  <th>NAME</th>
                  <th>SKU</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product, id) => {
                  return (
                    <tr key={id}>
                      <td>{product.name}</td>
                      <td>{product.sku || "*"}</td>
                      <td>{product.price.toString()}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <form action={deleteProduct}>
                          <input
                            type="hidden"
                            name="terminatedProductId"
                            value={product.id}
                          />
                          <button className="btn btn-sm btn-error btn-ghost">
                            DELETE
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-2xl font-sans flex text-red-400 gap-3">
              <span>unfortunately no result found</span>
              <Drama />
            </p>
          )}
        </div>
        <div className="p-3 border border-t-0 border-gray-200 flex justify-center absolute bottom-0 left-0 w-full">
          {numberOfPages >= 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              URL={"/inventory"}
              searchParams={{
                q,
                page: currentPage,
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default page;
