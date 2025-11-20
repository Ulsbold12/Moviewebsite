"use client";
import { useState } from "react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { StarRating } from "../icon/icon";
import { ModeToggle } from "./ModeToggle";

export const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const fetchTrailer = async () => {
    const res = await fetch("/api/trailer");
    const data = await res.json();

    // API-аас авсан трейлер ID гэж үзье (жишээ нь)
    const youtubeId = data.youtubeId || "xU6LYReBjQM";

    // YouTube embed URL болгож байна
    setTrailerUrl(`https://www.youtube.com/embed/${youtubeId}`);

    setOpen(true);
  };

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
                    <NavigationMenuLink className="w-150 h-80 bg-black"></NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenu>
            <Input
              className="w-[376px] h-[36px]"
              type="text"
              placeholder="Search.."></Input>
          </div>
          <ModeToggle />
        </div>
      </div>
      <Carousel className="w-full pt-6">
        <CarouselContent>
          <CarouselItem className="relative h-[600px]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center pl-30"
              style={{
                backgroundImage: "url('/Wicked.jpg')",
                backgroundSize: "cover",
              }}>
              <div className="flex flex-col w-101 h-[269px] border border-black gap-4">
                <div>
                  <h1 className="text-white font-normal text-base">
                    Now Plaing :
                  </h1>
                  <h2 className="text-white font-bold text-4xl">Wicked</h2>
                  <div className="flex flex-row items-center gap-1">
                    <StarRating />
                    <h1 className="text-white">6/10</h1>
                  </div>
                </div>
                <span className="text-white">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Delectus beatae autem laborum numquam tempora voluptatibus
                  omnis soluta dolor perspiciatis totam.
                </span>
                <button
                  onClick={fetchTrailer}
                  className="w-[145px] h-10 bg-white text-black rounded-xl font-bold">
                  Watch Trailer
                </button>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="h-[600px] bg-black text-white">Slide 2</div>
          </CarouselItem>

          <CarouselItem>
            <div className="h-[600px] bg-gray-900 text-white">Slide 3</div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="absolute mx-15 w-[40px] h-[40px] bg-white text-black" />
        <CarouselNext className="absolute mx-15 w-[40px] h-[40px] bg-white text-black" />
      </Carousel>
      {/* 🎬 TRAILER MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}>
          <div
            className="bg-white p-4 rounded-xl w-[90%] max-w-2xl"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="float-right text-black">
              ✕
            </button>

            {trailerUrl && (
              <iframe
                src={trailerUrl}
                className="w-full h-[350px] mt-3 rounded"
                allow="autoplay"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
