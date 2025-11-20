"use client";

import { StarRating } from "../icon/icon";
import { Movie } from "./Movie";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div key={movie.id}>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        className="w-[229px] h-[340px] rounded-tl-xl rounded-tr-xl "
      />
      <div className="w-[229px] h-[95px] bg-zinc-100 rounded-br-xl rounded-bl-xl flex flex-col gap-3 pt-3">
        <div className="flex gap-1 ">
          <StarRating />
          <h1 className="text-black">{movie.vote_average}/10</h1>
        </div>
        <h2 className="text-black">{movie.title}</h2>
      </div>
    </div>
  );
};
