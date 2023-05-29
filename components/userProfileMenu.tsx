'use client';
import { CreditCard, LogOut, PlusCircle, Settings, User as UserIcon} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {User} from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface UserProfileMenuProps {
    currentUser: User
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = (
    {currentUser}
) => {
  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar>
                <AvatarImage src={currentUser?.image!} />
                <AvatarFallback>{currentUser?.email!.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-70 mt-1 flex-auto min-w-[12em]" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex gap-3 items-center">
                <Avatar>
                <AvatarImage src={currentUser?.image!} />
                <AvatarFallback>{currentUser?.email!.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser?.name!}</p>
                <p className="text-xs leading-none text-muted-foreground">
                {currentUser?.email!}
                </p>
                </div>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>New Team</span>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default UserProfileMenu