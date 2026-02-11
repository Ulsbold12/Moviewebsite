"use client";

import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { HomeScreenEnd } from "../../_components/HomeScreenEnd";
import { getData } from "../../_utils/getData";
import { Badge } from "@/src/components/ui/badge";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../_components/Header";

type Genre = { id: number; name: string };

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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
  runtime: number;
  genres: Genre[];
};

export type VideoItem = { key: string; type: string };

export type Credits = {
  crew: { job: string; name: string }[];
  cast?: any[];
};

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

function MovieDetailSkeleton() {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-[1080px]">
          {/* Top row */}
          <div className="flex justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="h-7 w-72" />
              <div className="flex gap-2">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-4 w-10" />
                <SkeletonBlock className="h-4 w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-20" />
              <div className="flex gap-2 items-center">
                <SkeletonBlock className="h-6 w-6 rounded-full" />
                <SkeletonBlock className="h-5 w-14" />
                <SkeletonBlock className="h-5 w-10" />
              </div>
            </div>
          </div>

          {/* Poster + Player */}
          <div className="flex flex-row gap-6 mt-6">
            <SkeletonBlock className="w-[298px] h-[428px] rounded-xl" />
            <SkeletonBlock className="w-[760px] h-[428px] rounded-xl" />
          </div>

          {/* Genres + overview */}
          <div className="mt-10 space-y-4">
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>

            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-[92%]" />
              <SkeletonBlock className="h-4 w-[80%]" />
            </div>

            {/* Director/Writers/Stars */}
            <div className="mt-8 space-y-6">
              <div className="flex gap-3 border-b pb-3">
                <SkeletonBlock className="h-5 w-24" />
                <SkeletonBlock className="h-5 w-56" />
              </div>

              <div className="flex gap-3 border-b pb-3">
                <SkeletonBlock className="h-5 w-24" />
                <SkeletonBlock className="h-5 w-72" />
              </div>

              <div className="flex gap-3 border-b pb-3">
                <SkeletonBlock className="h-5 w-24" />
                <div className="flex gap-3">
                  <SkeletonBlock className="h-5 w-24" />
                  <SkeletonBlock className="h-5 w-24" />
                  <SkeletonBlock className="h-5 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More like this */}
      <div className="flex justify-center">
        <div className="w-[1080px] mt-20">
          <div className="flex flex-row justify-between mb-4">
            <SkeletonBlock className="h-7 w-48" />
            <SkeletonBlock className="h-6 w-24" />
          </div>

          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonBlock className="aspect-[2/3] w-full rounded-lg" />
                <SkeletonBlock className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeScreenEnd />
    </>
  );
}

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieid: string }>;
}) {
  const router = useRouter();
  const { movieid } = use(params);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [video, setVideo] = useState<string>("");
  const [credits, setCredits] = useState<Credits | null>(null);
  const [topStars, setTopStars] = useState<any[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const movieData = await getData(`${movieid}?language=en-US`);
        const videoData = await getData(`${movieid}/videos?language=en-US`);
        const creditsData = await getData(`${movieid}/credits?language=en-US`);
        const similarData = await getData(`${movieid}/similar?language=en-US`);

        const trailer =
          videoData?.results?.find((item: VideoItem) => item.type === "Trailer")
            ?.key ?? "";

        const top3 =
          creditsData?.cast
            ?.sort(
              (a: any, b: any) => (b.popularity ?? 0) - (a.popularity ?? 0),
            )
            .slice(0, 3) ?? [];

        if (!isMounted) return;

        setMovie(movieData ?? null);
        setVideo(trailer);
        setCredits(creditsData ?? null);
        setTopStars(top3);
        setSimilar(similarData?.results ?? []);
      } catch (e) {
        console.log(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [movieid]);

  const director = useMemo(
    () => credits?.crew?.find((c) => c.job === "Director"),
    [credits],
  );
  const writers = useMemo(
    () => credits?.crew?.filter((c) => c.job === "Writer") ?? [],
    [credits],
  );

  // ✅ skeleton нөхцөл
  if (loading || !movie) return <MovieDetailSkeleton />;

  return (
    <>
      <Header />

      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-[1080px] h-[524px]">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-2xl">{movie.title}</h1>
              <div className="flex flex-row gap-1">
                <h2>{movie.release_date}</h2>
                <h2 className="font-bold">PG</h2>
                <h2>{movie.runtime} min</h2>
              </div>
            </div>

            <div>
              <h2>Rating</h2>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="yellow"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star-icon lucide-star">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                <h2 className="font-bold">{movie.vote_average}</h2>
                <h2>/10</h2>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="w-[298px] h-[428px]"
              alt={movie.title}
            />

            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${video}`}
              width={1000}
              height={428}
              controls
            />
          </div>
        </div>

        <div className="w-[1080px] mt-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              {movie.genres?.map((g) => (
                <Badge
                  key={g.id}
                  className="bg-white text-black font-bold border border-black">
                  {g.name}
                </Badge>
              ))}
            </div>

            <span>{movie.overview}</span>
          </div>

          <div className="mt-10 flex flex-col gap-10">
            <div className="flex gap-2 border-b">
              <h1 className="font-bold">Director:</h1>
              <h2>{director?.name}</h2>
            </div>

            <div className="flex gap-2 border-b">
              <h1 className="font-bold">Writers:</h1>
              <h2>{writers.map((w) => w.name).join(", ")}</h2>
            </div>

            <div className="flex flex-row border-b">
              <h1 className="font-bold mb-2">Top Stars:</h1>
              <div className="ml-6 flex flex-row gap-3 font-bold">
                {topStars.map((star) => (
                  <span key={star.id}>{star.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* more like this */}
      <div className="flex justify-center">
        <div className="w-[1080px] mt-20">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">More like this</h1>
            <h1
              onClick={() => router.push(`/similar/${movieid}`)}
              className="text-xl cursor-pointer">
              See more
            </h1>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {similar.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:scale-105 transition"
                onClick={() => router.push(`/movie/${item.id}`)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  className="rounded-lg w-full"
                  alt={item.title}
                />
                <h2 className="text-center mt-2 text-sm">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeScreenEnd />
    </>
  );
}
