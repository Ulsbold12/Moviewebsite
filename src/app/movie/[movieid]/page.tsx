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
  runtime: number;
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
  const [movie, setMovie] = useState<Movie>();
  const [video, setVideo] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`${movieid}?language=en-US`);
      const videoData = await getData(`${movieid}/videos?language=en-US`);
      const info = await getData(` ${movieid}/credits?language=en-US`);

      console.log(videoData);

      setMovie(data);
      setVideo(videoData?.results.find((item) => item.type === "Trailer").key);
      setInfo(data);
      console.log(data);
      console.log(videoData);
      console.log(info);
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-20 ">
        <div className="flex flex-col w-[1080px] h-[524px]">
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <h1>{movie?.title}</h1>
              <h2>{movie?.release_date}</h2>
              <h2>{movie?.runtime}</h2>
            </div>
            <div className="flex flex-col">
              <h2>rating</h2>
              <h2>{movie?.vote_average}</h2>
            </div>
          </div>
          <div className="flex flex-row ">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt=""
              className="w-[298px] h-[428px]"
            />
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${video}`}
              width={1000}
              height={428}
            />
          </div>
        </div>
        <div className="w-[1080px] h-[524px]">
          <span>{movie?.overview}</span>
          <div className="mt-10">
            <div className="flex flex-row">
              <h1>Direction</h1>
              <h2></h2>
            </div>
            <div className="flex flex-row">
              <h1>Writers</h1>
              <h2></h2>
            </div>
          </div>
        </div>
      </div>
      <HomeScreenEnd />
    </>
  );
};

export default MovieDetailPage;
