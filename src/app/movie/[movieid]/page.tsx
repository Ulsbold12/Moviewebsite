"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { Header } from "../../_components/header";
import ReactPlayer from "react-player";
import { HomeScreenEnd } from "../../_components/HomeScreenEnd";
import { getData } from "../../_utils/getData";

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
};

export type VideoItem = {
  key: string;
  type: string;
};

export type Credits = {
  crew: { job: string; name: string }[];
};

const MovieDetailPage = ({
  params,
}: {
  params: Promise<{ movieid: string }>;
}) => {
  const { movieid } = use(params);
  const [movie, setMovie] = useState<Movie>();
  const [video, setVideo] = useState<string>("");
  const [credits, setCredits] = useState<Credits>();
  const [topStars, setTopStars] = useState<any[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getData(`${movieid}?language=en-US`);
      const videoData = await getData(`${movieid}/videos?language=en-US`);
      const creditsData = await getData(`${movieid}/credits?language=en-US`);
      const similarData = await getData(`${movieid}/similar?language=en-US`);

      const trailer =
        videoData?.results?.find((item: VideoItem) => item.type === "Trailer")
          ?.key ?? "";

      const top3 =
        creditsData.cast
          ?.sort((a: any, b: any) => b.popularity - a.popularit)
          .slice(0, 3) ?? [];

      setMovie(movieData);
      setVideo(trailer);
      setCredits(creditsData);
      setTopStars(top3);
      setSimilar(similarData?.results ?? []);
      console.log(movieData);
      console.log(creditsData);
    };

    fetchData();
  }, [movieid]);

  const director = credits?.crew?.find((c) => c.job === "Director");
  const writers = credits?.crew?.filter((c) => c.job === "Writer");

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-[1080px] h-[524px]">
          <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-2xl">{movie?.title}</h1>
              <div className="flex flex-row gap-1">
                <h2>{movie?.release_date}</h2>
                <h2 className="font-bold">PG</h2>
                <h2>{movie?.runtime} min</h2>
              </div>
            </div>
            <div>
              <h2>Rating</h2>
              <div className="flex flex-row">
                <h2 className="font-bold">{movie?.vote_average}</h2>
                <h2>/10</h2>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-25">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              className="w-[298px] h-[428px]"
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
          <span>{movie?.overview}</span>

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex gap-2">
              <h1 className="font-bold">Director:</h1>
              <h2>{director?.name}</h2>
            </div>

            <div className="flex gap-2">
              <h1 className="font-bold">Writers:</h1>
              <h2>{writers?.map((w) => w.name).join(", ")}</h2>
            </div>
            <div className="flex flex-row">
              <h1 className="font-bold mb-2">Top Stars:</h1>
              <h1 className="list-disc ml-6 flex flex-row gap-3 font-bold">
                {topStars.map((star) => (
                  <h1 key={star.id}>{star.name}</h1>
                ))}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* more like this heseg  */}
      <div className="flex justify-center">
        <div className="w-[1080px] mt-20">
          <h1 className="text-2xl font-bold mb-4">More like this</h1>

          <div className="grid grid-cols-5 gap-4">
            {similar.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:scale-105 transition"
                onClick={() => (window.location.href = `/movie/${item.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  className="rounded-lg w-full"
                />
                <h2 className="text-center mt-2 text-sm">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* more like this duuusan */}

      <HomeScreenEnd />
    </>
  );
};

export default MovieDetailPage;
