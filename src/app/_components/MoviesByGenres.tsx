"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MovieCard } from "./MovieCards";

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

export const MoviesByGenres = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const genreIds = searchParams.get("genreIds");
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log(genreIds);

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${1}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
              accept: "application/json",
            },
          }
        );
        const data = (await res.json()) as Response;
        console.log(data.results);

        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }

      setloading(false);
    };

    getData();
  }, [genreIds.join(",")]);
  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {movies?.slice(0, 30)?.map((el) => (
          <MovieCard
            key={el.id}
            id={el.id}
            backdrop_path={el.backdrop_path}
            title={el.title}
            vote_average={el.vote_average}
          />
        ))}
      </div>
    </>
  );
};
