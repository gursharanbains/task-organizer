"use client";
import { UserButton } from "@clerk/nextjs";
import Logo from "./app-logo";
import ThemeSwitcher from "./theme-switcher";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { theme } = useTheme();
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-16">
      <Logo />
      <div className="flex items-center gap-4">
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
