import { TrendingUp } from "lucide-react";
import SideBare from "../../components/SideBare";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/server";
const page = async () => {
  const { data } = await auth.getSession();
  const currentLoggedUserID = data?.user?.id;

  const [numberOfProducts, allProducts, recent, low] = await Promise.all([
    prisma.product.count({
      where: {
        userId: currentLoggedUserID,
      },
    }),
    prisma.product.findMany({
      where: {
        userId: currentLoggedUserID,
      },
      select: {
        price: true,
        quantity: true,
        createdAt: true,
      },
    }),
    prisma.product.findMany({
      where: {
        userId: currentLoggedUserID,
      },
      take: 4,
      orderBy: {
        createdAt: "asc",
      },
      select: {
        name: true,
        price: true,
        quantity: true,
        lowStock: true,
      },
    }),
    prisma.product.count({
      where: {
        userId: currentLoggedUserID,
        lowStock: { not: null },
        quantity: { lte: 5 },
      },
    }),
  ]);

  const totalPrice = allProducts.reduce(
    (current, product) =>
      current + Number(product.price) * Number(product.quantity),
    0,
  );

  return (
    <div className="h-screen bg-[#ebebea]">
      <SideBare />
      <main className="ml-64 py-3 px-4">
        <div className="mb-4">
          <div className="font-extrabold text-2xl">Dashboard</div>
          <p className="text-sm text-gray-400 mt-1">
            welcome back ! here's an overview of your inventory
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First DIV IN THE  GRID */}
          <div className="border  border-gray-200 p-5 rounded-sm  bg-white">
            <div className="font-medium uppercase text-lg mb-2">
              <span>Key Matrics</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center space-y-2 p-2">
                <div className="semi-bold text-lg font-bold">
                  {numberOfProducts}
                </div>
                <div className="bold text-sm text-gray-400">Total Products</div>
                <div className="flex items-center justify-center gap-1 text-green-500 text-xs">
                  <span>+{numberOfProducts}</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="text-center space-y-2 p-2">
                <div className="semi-bold text-lg font-bold">
                  ${Number(totalPrice).toFixed()}
                </div>
                <div className="bold text-sm text-gray-400">Total Value</div>
                <div className="flex items-center justify-center gap-1 text-green-500 text-xs">
                  <span>+${totalPrice}</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="text-center space-y-2 p-2">
                <div className="semi-bold text-lg font-bold">{low}</div>
                <div className="bold text-sm text-gray-400">Low</div>
                <div className="flex items-center justify-center gap-1 text-green-500 text-xs">
                  <span>+{low}</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* SECOND DIV IN THE GRID */}
          <div className="border  border-gray-200 p-5 rounded-sm  bg-white">
            <div className="font-medium uppercase text-lg mb-2">
              <span>STOCKES</span>
            </div>
            <div className="space-y-5">
              {recent.map((product, key) => {
                const stockState =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= product.lowStock
                      ? 1
                      : 2;

                const colorMatrics = ["#ed0c3d", "#e57b1f", "#22aa1d"];

                return (
                  <div
                    key={key}
                    className="bg-gray-300 py-2 px-4 flex justify-between items-center rounded-sm shadow-lg"
                  >
                    <div className="flex space-x-2 items-center ">
                      <div
                        className={`size-3 bg-[${colorMatrics[stockState]}] rounded-full`}
                      />
                      <span>{product.name}</span>
                    </div>
                    <div>
                      <span
                        className="font-bold"
                        style={{ color: colorMatrics[stockState] }}
                      >
                        {product.quantity} units
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
