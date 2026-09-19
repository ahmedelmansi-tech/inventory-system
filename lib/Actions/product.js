import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
import colors from "colors";

const productSchema = z.object({
  name: z.string().min(1, "can't be empty"),
  quantity: z.coerce.number().int().nonnegative("can't be negative"),
  price: z.coerce.number().nonnegative("can't be negative"),
  sku: z.string().optional(),
  lowStock: z.coerce.number().optional(),
});
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

export const searchProduct = async (formData) => {
  "use server";
  const q = formData.get("q");
  redirect(`/inventory?q=${q}`);
};

export const createProduct = async (formData) => {
  "use server";

  const { data } = await auth.getSession();
  const authenticatedUser = data?.user?.id;

  // console.log("DATA".bgGreen, data);
  // console.log("LOGED USER".bgWhite, authenticatedUser);

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
    sku: formData.get("sku") || undefined,
    lowStock: formData.get("lowStock") || 1,
  });

  console.log("RESULT".bgYellow, parsed);

  if (!parsed.success) {
    throw new Error("faild validation");
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: authenticatedUser },
    });
  } catch (error) {
    // "failed to add new product"
    throw new Error(error.message);
  }
  redirect("/inventory");
};
