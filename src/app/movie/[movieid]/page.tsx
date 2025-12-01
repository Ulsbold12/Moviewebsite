"use client";

import { use } from "react";
import { useEffect, useState } from "react";

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
  results: Movie;
  total_pages: number;
  total_results: number;
};

const MovieDetailPage = ({
  params,
}: {
  params: Promise<{ movieid: string }>;
}) => {
  const { movieid } = use(params);
  const [movie, setMovie] = useState<Movie>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);

        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <>
      <div>hi{movieid}</div>
    </>
  );
};

export default MovieDetailPage;
