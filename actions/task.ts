"use server";

import prisma from "@/lib/db";
import { createTaskSchemaType } from "@/validation/task";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.create({
    data: {
      userId: user.id,
      description: data.description,
      expiresAt: data.expiresAt,
      Project: {
        connect: {
          id: data.projectId,
        },
      },
    },
  });
}

export async function markTaskComplete(taskId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      complete: true,
    },
  });
}
