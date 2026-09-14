import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (formData) => {
  "use server";
  const { data } = await auth.getSession();

  //   if (!data?.user?.userId) {
  //     throw new Error("should log in first");
  //   }

  console.table("ME", data?.user?.userId);

  await prisma.product.deleteMany({
    where: {
      userId: data?.user?.userId,
      id: formData.get("terminatedProductId"),
    },
  });

  revalidatePath("/inventory");
};
