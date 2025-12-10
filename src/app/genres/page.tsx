"use client";

import { useParams } from "next/navigation";
import { GenreList } from "../_components/GenreList";
import { Header } from "../_components/header";
import { HomeScreenEnd } from "../_components/HomeScreenEnd";
import { MoviesByGenres } from "../_components/MoviesByGenres";

export default function MovieGenre() {
  const params = useParams();
  return (
    <>
      <div>
        <Header />
        <div className="flex justify-end pr-10">
          <h1 className="text-3xl font-bold">Search result</h1>
        </div>
        <div className="mt-5 ">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">Search by genre</h1>
            <h1 className="font-bold ">See lists of movies by genre</h1>
          </div>
          <div className="w-screen mt-4">
            <div className="flex gap-20">
              <div>
                <GenreList />
              </div>
              <MoviesByGenres />
            </div>
          </div>
        </div>
        <HomeScreenEnd />
      </div>
    </>
  );
}
