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
        <img
          className="h-25 w-16.75 rounded-md hover:grayscale-35 onject-cover"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/placeholderimg.jpeg"
          }
          alt={movie.title || "Movie poster"}
          onError={(e) => (e.currentTarget.src = "/placeholderimg.jpeg")}
        />

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
