import { UserButton } from "@clerk/nextjs";
import Logo from "./app-logo";
import ThemeSwitcher from "./theme-switcher";

export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-16">
      <Logo />
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
