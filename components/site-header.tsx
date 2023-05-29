import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import getCurrentUser from "@/app/actions/getCurrentUser";
import UserProfileMenu from "./userProfileMenu";

export async function SiteHeader() {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/*<ThemeToggle />*/}
            {currentUser &&
              <UserProfileMenu currentUser={currentUser} />
            }
          </nav>
        </div>
      </div>
    </header>
  )
}
