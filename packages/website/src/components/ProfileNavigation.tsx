"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@tonyswan/ui";
import { Icons } from "@/components/Icons";
import React from "react";
import { cn } from "@tonyswan/utils";
import { User } from "next-auth";
import Link from "next/link";

const ProfileNavigation = ({ user }: { user: User }) => {
  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent data-motion="from-end">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/profile/${user.id}`}
                  >
                    <Avatar>
                      {user.image && <AvatarImage src={user?.image} />}
                      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {user.name}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Checkout your profile.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href={`/profile/${user.id}/training`} title="Training">
                Checkout your training schedule
              </ListItem>
              <ListItem href={`/profile/${user.id}/diet`} title="Diet">
                Checkout your diet
              </ListItem>
              <ListItem href={`/profile/${user.id}/blog`} title="Blog">
                Checkout your blog posts
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="right-0" />
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export { ProfileNavigation };
