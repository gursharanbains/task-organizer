import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/validation/project";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ProjectColors, ProjectColor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createProject } from "@/actions/project";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface IAddProjectSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProjectSidebar({
  open,
  onOpenChange,
}: IAddProjectSidebarProps) {
  const form = useForm<createProjectSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createProjectSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: createProjectSchemaType) => {
    try {
      await createProject(data);
      onOpenChangeWrapper(false);
      router.refresh(); //Refresh the page to show the new project

      toast({
        title: "Success",
        description: "Your project has been created.",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onOpenChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Project</SheetTitle>
          <SheetDescription>
            You can organize related tasks in a project.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Daily" {...field} />
                  </FormControl>
                  <FormDescription>Project Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-black",
                          ProjectColors[field.value as ProjectColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(ProjectColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              "w-full h-8 rounded-md my-1 text-black focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8",
                              ProjectColors[color as ProjectColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
            className={cn(
              form.watch("color") &&
                ProjectColors[form.getValues("color") as ProjectColor]
            )}
          >
            Create Project
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
