import { ProjectColors } from "@/lib/constants";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(2, {
    message: "Your project name must have at least 2 characters",
  }),
  color: z
    .string()
    .refine((color) => Object.keys(ProjectColors).includes(color)),
});

export type createProjectSchemaType = z.infer<typeof createProjectSchema>;
