"use client";

import { Input } from "@/src/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/src/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { GenreList } from "./GenreList";
import Link from "next/link";
import { SearchInput } from "./SearchInput";

export const Header = () => {
  return (
    <>
      <div className="w-screem h-[59px]  border-purple flex justify-center items-center">
        <div className="w-[1280px] h-[36px] flex flex-row justify-between items-center">
          <div className="">
            <Link href="/" aria-label="Нүүр хуудас руу буцах">
              <img src="/Logo.png" className="w-[92px] h-[20px] object-cover" />
            </Link>
          </div>
          <div className="flex flex-row">
            <NavigationMenu className="w-[97px] h-[36px]">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Genre
                  <NavigationMenuContent>
                    <NavigationMenuLink className="w-150 h-60">
                      <GenreList />
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenu>
            <SearchInput />
          </div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
