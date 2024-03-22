import { z } from "zod";

export const createTaskSchema = z.object({
  projectId: z.string(),
  description: z.string().min(5, {
    message: "Your description must have at least 5 characters",
  }),
  expiresAt: z.date().optional(),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
