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
        <h1>Search</h1>
        <div className="w-screen mt-10">
          <h1 className="font-bold">Genres</h1>
          <div className="flex gap-20">
            <div>
              <GenreList />
            </div>
            <MoviesByGenres />
          </div>
        </div>
        <HomeScreenEnd />
      </div>
    </>
  );
}
