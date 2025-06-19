import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUserWithRole() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  return user;
}

export async function isAdmin() {
  const user = await getUserWithRole();
  return user.role === "ADMIN";
}
