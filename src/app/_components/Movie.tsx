"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCards";
import { ArrowRightIcon } from "lucide-react";

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

export const MovieSection = ({
  categoryName,
  categoryPath,
}: {
  categoryName: string;
  categoryPath: string;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);

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
    <div className="w-screen h-[978px] flex flex-col items-center gap-10 mt-10">
      <div className=" w-[1277px] flex justify-between ">
        <div className="text-3xl font-bold ">{categoryName} </div>
        <button className="flex items-center">
          See more <ArrowRightIcon />{" "}
        </button>
      </div>
      <div className="grid grid-cols-5 sm-grid-cols-5  gap-10  ">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// const movieList: MovieCardProps[] = [
//   {
//     id: 1,
//     rank: "2/10",
//     name: "Dear Santa",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 2,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 3,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 4,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 5,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 6,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 7,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 8,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 9,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 10,
//     rank: "2/10",
//     name: "How To Train Your Dragon Live Action",
//     image: "/Wicked.jpg",
//   },
// ];
