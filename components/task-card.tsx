"use client";

import { Task } from "@prisma/client";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { markTaskComplete } from "@/actions/task";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-500 dark:text-gray-300";

  if (days <= 1 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 3 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}

interface ITaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: ITaskCardProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const completeTask = async () => {
    await markTaskComplete(task.id);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <Checkbox
        id={task.id.toString()}
        onCheckedChange={() => {
          startTransition(completeTask);
        }}
        checked={task.complete}
        disabled={task.complete || isLoading}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.complete && "line-through"
        )}
      >
        {task.description}
        {task.expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expiresAt)
            )}
          >
            {format(task.expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
}
