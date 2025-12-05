"use client";

import Link from "next/link";
import { StarRating } from "../icon/icon";
import { Movie } from "./Movie";
import { MovieImage } from "./MovieImage";

type MovieCardProps = {
  id: number;
  backdrop_path?: string;
  title: string;
  vote_average: number;
  className?: string;
};

export const MovieCard = ({
  id,
  backdrop_path,
  title,
  vote_average,
}: MovieCardProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <div key={id} className="rounded-xl overflow-hidden">
        <MovieImage
          backdrop_path={backdrop_path}
          title={title}
          className="w-[229px] h-[340px]"
        />
        <div className="w-[229px] h-[95px] bg-zinc-100 rounded-br-xl rounded-bl-xl flex flex-col gap-3 pt-3">
          <div className="flex gap-1 ">
            <StarRating />
            <h1 className="text-black">{vote_average}/10</h1>
          </div>
          <h2 className="text-black">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
