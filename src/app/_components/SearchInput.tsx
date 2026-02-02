"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Movie } from "./HomeScreen";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { MovieSearch } from "./MovieSearch";

export type InputProps = {
  movie: Movie;
};

export const SearchInput = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  useEffect(() => {
    setLoading(true);
    const getSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
          },
        },
      );

      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
      console.log("data", data);
    };
    getSearch();
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="h-9 w-24 border border-[#E4E4E7] rounded-md"
        asChild>
        <Input
          placeholder="Search ..."
          value={query}
          readOnly
          className={cn("w-144.25", open && "opacity-0")}></Input>
      </PopoverTrigger>
      <PopoverContent className="w-144.25 p-3 flex flex-col items-center">
        <Input
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          className="w-144.25! absolute -top-10 pl-10"></Input>

        <div className="w-full max-h-150 rounded-md overflow-scroll flex flex-col items-center">
          {loading && <p className="p-4 text-center">Loading ...</p>}
          {!loading && movies.length === 0 && (
            <p className="p-4 text-center">No results found.</p>
          )}
          {!loading &&
            movies.map((movie) => (
              <MovieSearch key={movie.id} movie={movie} id={movie.id} />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
