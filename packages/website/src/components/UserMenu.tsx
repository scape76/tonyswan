"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@tonyswan/ui";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

type UserMenuProps = { user: User };

const UserMenu = ({ user }: UserMenuProps) => {
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user.image && <AvatarImage src={user?.image} />}
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${user.id}`}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <LogoutButton className="w-full" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
