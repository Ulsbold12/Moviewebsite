"use client";

import { Badge } from "@/src/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
type Genre = {
  name: string;
  id: number;
};

export const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];

  const handleClickGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const test = genreIds.length > 0 ? [...genreIds, genreId] : [genreId];

    const updateGenreIds = genreIds?.includes(genreId)
      ? genreIds.filter((id) => id !== genreId)
      : test;

    const param = updateGenreIds.length > 0 ? updateGenreIds.join(",") : "";

    params.set("genreIds", param);
    const path = updateGenreIds.length > 0 ? params : "";
    router.push("/genres?" + path);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
          },
        },
      );
      const data = await res.json();
      console.log(data, "dataaaasjde");
      console.log(data.genres, "hdsgsh");

      setGenres(data.genres);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 max-w-md border-r h-100 ">
      {genres?.map((el) => {
        return (
          <Badge
            key={el.id}
            className=" h-5 w-20"
            variant={
              genreIds.includes(el.id.toString()) ? "default" : "outline"
            }
            onClick={() => handleClickGenre(el.id.toString())}>
            {el.name}
            <ChevronRight />
          </Badge>
        );
      })}
    </div>
  );
};
