"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCards";
import { getData } from "../_utils/getData";

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
};

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type Props = {
  movieId: number;
  limit?: number;
  currentPage: number;
  onTotalPagesChange?: (n: number) => void;
};

export const MoreLikeSection = ({
  movieId,
  limit = 10,
  currentPage,
  onTotalPagesChange,
}: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const data = (await getData(
          `${movieId}/similar?language=en-US&page=${currentPage}`,
        )) as Response;

        setMovies(data?.results ?? []);
        onTotalPagesChange?.(data?.total_pages ?? 1);
      } catch (e) {
        console.log(e);
        setMovies([]);
        onTotalPagesChange?.(1);
      } finally {
        setLoading(false);
      }
    };

    if (Number.isFinite(movieId)) fetchSimilar();
  }, [movieId, currentPage, onTotalPagesChange]);

  return (
    <div className="w-screen flex flex-col items-center gap-6 mt-10">
      <div className="w-[1277px] flex justify-between">
        <div className="text-3xl font-bold">More like this</div>
      </div>

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-5 sm-grid-cols-5 gap-10">
          {movies.slice(0, limit).map((el) => (
            <MovieCard
              key={el.id}
              id={el.id}
              backdrop_path={el.backdrop_path}
              title={el.title}
              vote_average={el.vote_average}
            />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="w-[1277px] text-sm opacity-70">
          No similar movies found.
        </div>
      )}
    </div>
  );
};
