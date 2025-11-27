"use client";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { StarRating } from "../icon/icon";
import { ModeToggle } from "./ModeToggle";
import { Header } from "./header";
import { WatchTrailerButton } from "./WatchTrailerButton";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const HomeScreen = () => {
  const [moview, SetMoview] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
              accept: "application/json",
            },
          }
        );
        const data = (await res.json()) as Response;
        console.log(data.results);

        SetMoview(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Header />

      <Carousel className="w-full pt-6">
        <CarouselContent>
          {moview?.map((m) => (
            <CarouselItem key={m.id} className="relative h-[600px]">
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/original${m.backdrop_path}")`,
                }}
              ></div>

              <div className="absolute inset-0 bg-black/50 flex items-center pl-32">
                <div className="flex flex-col w-[450px] gap-4">
                  <h1 className="text-white text-base">Now Playing :</h1>
                  <h2 className="text-white font-bold text-4xl">{m.title}</h2>

                  <div className="flex items-center gap-1">
                    <StarRating />
                    <p className="text-white">{m.vote_average.toFixed(1)}/10</p>
                  </div>

                  <p className="text-white line-clamp-3">{m.overview}</p>

                  <WatchTrailerButton movieId={m.id} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute mx-15 w-[40px] h-[40px] bg-white text-black" />
        <CarouselNext className="absolute mx-15 w-[40px] h-[40px] bg-white text-black" />
      </Carousel>
    </>
  );
};
