"use client";

import { StarRating } from "../icon/icon";
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
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const MovieListPopular = () => {
  return (
    <>
      
    </>
  );
};

// const moviePopular: MoviePopularCardProps[] = [
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
//   {
//     id: 1,
//     rank: "1/1",
//     name: "ajkdqwegfne",
//     image: "/Wicked.jpg",
//   },
// ];
