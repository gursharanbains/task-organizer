"use server";
import prisma from "@/lib/db";
import { createProjectSchemaType } from "@/validation/project";
import { currentUser } from "@clerk/nextjs";

export async function createProject(form: createProjectSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.project.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function deleteProject(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found.");
  }

  return await prisma.project.delete({
    where: {
      id: id,
    },
  });
}
