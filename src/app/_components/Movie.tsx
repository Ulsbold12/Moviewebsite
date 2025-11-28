"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCards";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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

type MovieSectionProps = {
  categoryName: string;
  categoryPath: string;
  hideSeeMore?: boolean;
  limit?: number;
};
export const MovieSection = ({
  categoryName,
  categoryPath,
  limit = 10,
  hideSeeMore = false,
}: MovieSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${categoryPath}?language=en-US&page=1`,
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
    };

    getData();
  }, []);

  return (
    <div
      className="w-screen h-[978px] flex flex-col items-center gap-10 mt-10"
      key={categoryName}>
      <div className=" w-[1277px] flex justify-between ">
        <div className="text-3xl font-bold ">{categoryName} </div>
        {!hideSeeMore && (
          <button
            onClick={() => {
              router.push(`/category/${categoryPath}`);
            }}
            className="flex ">
            See more <ArrowRightIcon />{" "}
          </button>
        )}
      </div>
      <div className="grid grid-cols-5 sm-grid-cols-5  gap-10  ">
        {movies?.slice(0, limit)?.map((el) => (
          <MovieCard
            key={el.id}
            id={el.id}
            backdrop_path={el.backdrop_path}
            title={el.title}
            vote_average={el.vote_average}
          />
        ))}
      </div>
    </div>
  );
};
