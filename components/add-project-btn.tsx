"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import AddProjectSidebar from "./add-project-sidebar";

export default function AddProjectBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
          Add a new project
        </span>
      </Button>
      <AddProjectSidebar open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}
