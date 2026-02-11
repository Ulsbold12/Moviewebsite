"use client";

import Link from "next/link";
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
            <h1 className="text-black flex flex-row gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="yellow"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star ">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              {vote_average}/10
            </h1>
          </div>
          <h2 className="text-black">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
