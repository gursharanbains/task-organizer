import { currentUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PlusCircleIcon from "@/components/ui/icons/plus-circle";
import prisma from "@/lib/db";
import AddProjectBtn from "@/components/add-project-btn";
import ProjectCard from "@/components/project-card";

export default async function ProjectList() {
  const user = await currentUser();
  const projects = await prisma.project.findMany({
    include: {
      Tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (projects.length === 0) {
    return (
      <div className="flex flex-col gap-6 mt-6">
        <Alert>
          <AlertTitle>You {`don't`} have any projects yet</AlertTitle>
          <AlertDescription className="flex items-center gap-2">
            Create your first project now!{" "}
            <span className="inline-flex">
              <PlusCircleIcon />
            </span>
          </AlertDescription>
        </Alert>
        <AddProjectBtn />
      </div>
    );
  }

  return (
    <div>
      <AddProjectBtn />
      <div className="flex flex-col gap-4 mt-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
