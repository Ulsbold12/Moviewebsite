import Link from "next/link";
import { Movie } from "./Movie";

type MovieSearchProps = {
  movie: Movie;
  id: number;
};

export const MovieSearch = ({ movie, id }: MovieSearchProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="h-29 w-138.25 dark:bg-[#27272A] flex gap-4 ">
        {movie.poster_path ? (
          <img
            className="h-25 w-16.75 rounded-md hover:grayscale-35 object-cover flex-shrink-0"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.removeAttribute("style");
            }}
          />
        ) : null}
        {!movie.poster_path && (
          <div className="h-25 w-16.75 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🎬</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold">{movie.title}</p>
            <div className="flex items-center">
              <p className="text-[14px]">{movie.vote_average.toFixed(1)}/10</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
