"use client";

import { Project, Task } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useMemo, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ProjectColors, ProjectColor } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusCircleIcon from "./ui/icons/plus-circle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { deleteProject as deleteProjectAction } from "@/actions/project";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import AddTaskModal from "./add-task-modal";
import TaskCard from "./task-card";

interface IProjectCardProps {
  project: Project & {
    Tasks: Task[];
  };
}

export default function ProjectCard({ project }: IProjectCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const tasks = project.Tasks;
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [isLoading, startTransition] = useTransition();

  const deleteProject = async () => {
    try {
      await deleteProjectAction(project.id);
      toast({
        title: "Success",
        description: "Your project was deleted",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    startTransition(deleteProject);
  };

  function setShowCreateModal(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  const totalTasks = project.Tasks.length;
  const completedTasks = useMemo(() => {
    return project.Tasks.filter((task) => task.complete).length;
  }, [project.Tasks]);

  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <>
      <AddTaskModal
        open={taskModalOpen}
        setOpen={setTaskModalOpen}
        project={project}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              ProjectColors[project.color as ProjectColor]
            )}
          >
            <span className="font-bold">{project.name}</span>
            {!isOpen ? (
              <CaretDownIcon className="h-6 w-6" />
            ) : (
              <CaretUpIcon className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && (
            <Button
              variant="ghost"
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setTaskModalOpen(true)}
            >
              <p>No tasks</p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  ProjectColors[project.color as ProjectColor]
                )}
              >
                Create one now!
              </span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="flex flex-col p-4 gap-3">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-10 p-4 text-xs text-neutral-500 flex justify-between items-center">
            <p>Created at {project.createdAt.toLocaleDateString("en-US")}</p>
            <div className="flex items-center">
              {isLoading && <div>Deleting...</div>}
              {!isLoading && (
                <>
                  <AddTaskButton onClick={() => setTaskModalOpen(true)} />
                  <DeleteProjectButton handleClick={() => handleDelete()} />
                </>
              )}
            </div>
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

interface IAddTaskButtonProps {
  onClick: () => void;
}

export function AddTaskButton({ onClick }: IAddTaskButtonProps) {
  return (
    <Button size="icon" variant="ghost" onClick={onClick}>
      <PlusCircleIcon />
    </Button>
  );
}

interface IDeleteProjectButtonProps {
  handleClick: () => void;
}

export function DeleteProjectButton({
  handleClick,
}: IDeleteProjectButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <TrashIcon width={22} height={22} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you sure you want to delete this project?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-light text-white/60">
          This is a permanent action that will remove the project and all
          associated tasks. You will not be able to recover them later.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClick()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
