import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/db";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import ProjectList from "./project-list";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<UserGreetingFallback />}>
        <UserGreeting />
      </Suspense>
      <Suspense fallback={<ProjectListFallback />}>
        <ProjectList />
      </Suspense>
    </>
  );
}

async function UserGreeting() {
  const user = await currentUser();

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="flex w-full text-4xl font-bold mb-14">
      Welcome, {user.firstName} {user.lastName}{" "}
    </div>
  );
}

function UserGreetingFallback() {
  return (
    <div className="flex w-full text-4xl font-bold mb-14">
      <Skeleton className="w-36 h-12" />
    </div>
  );
}

function ProjectListFallback() {
  return (
    <div className="flex w-full text-4xl font-bold">Loading projects.</div>
  );
}
