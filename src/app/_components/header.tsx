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

export const Header = () => {
  return (
    <>
      <div className="w-screem h-[59px] border border-purple flex justify-center items-center">
        <div className="w-[1280px] h-[36px] flex flex-row justify-between items-center">
          <div className="">
            <img src="/Logo.png" className="w-[92px] h-[20px] object-cover" />
          </div>
          <div className="flex flex-row">
            <NavigationMenu className="w-[97px] h-[36px]">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Genre
                  <NavigationMenuContent>
                    <NavigationMenuLink className="w-150 h-80">
                      <GenreList />
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenu>
            <Input
              className="w-[376px] h-[36px]"
              type="text"
              placeholder="Search.."
            ></Input>
          </div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
