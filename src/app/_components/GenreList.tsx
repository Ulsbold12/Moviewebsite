"use client";

import { Badge } from "@/src/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Genre = {
  name: string;
  id: number;
};

export const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
          },
        }
      );
      const data = await res.json();
      console.log(data, "dataaaasjde");
      console.log(data.genres, "hdsgsh");

      setGenres(data.genres);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 max-w-md border-r">
      {genres?.map((el, index) => {
        return (
          <Badge key={index} className="flex">
            {el.name}
            <ChevronRight />
          </Badge>
        );
      })}
    </div>
  );
};
