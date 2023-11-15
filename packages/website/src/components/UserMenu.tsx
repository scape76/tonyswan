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
  navigationMenuTriggerStyle,
} from "@tonyswan/ui";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@tonyswan/ui";
import { Icons } from "@/components/Icons";
import React from "react";
import { cn } from "@tonyswan/utils";
import { UserAvatar } from "./UserAvatar";

type UserMenuProps = { user: User };

const UserMenu = ({ user }: UserMenuProps) => {
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
        <DropdownMenuItem asChild>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <LogoutButton className="w-full" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
