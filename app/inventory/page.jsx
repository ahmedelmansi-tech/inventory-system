import SideBare from "../../components/SideBare";
import Search from "../../components/Search";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/server";
import { deleteProduct, searchProduct } from "@/lib/Actions/product.js";
const page = async ({ currentPath = "/inventory", searchParams }) => {
  // GET THE CURRENT LOGGED USER
  const { data } = await auth.getSession();
  const currentUserID = data?.user?.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  // console.log(params.q);

  // GET ALL PRODUCTS
  const allProducts = await prisma.product.findMany({
    where: {
      userId: currentUserID,
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      sku: true,
      price: true,
      quantity: true,
      id: true,
    },
  });

  return (
    <div>
      <SideBare />
      <main className="ml-48 h-screen">
        <div className="mb-4 py-3 px-4">
          <div className="font-extrabold text-2xl">Inventory</div>
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
          <Search />
        </form>

        <div className="px-3">
          <table className="table table-zebra max-h-64">
            <thead>
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
        </div>
      </main>
    </div>
  );
};

export default page;
