"use client";

import { Badge, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const GenreList = () => {
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${categoryPath}?language=en-US&page=1`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
          },
        }
      );
      const data = await res.json();
      console.log(data);

      setGenres(data.genres);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap gap-4 max-w-md border-r">
      {genres?.map((el) => {
        return (
          <Badge key={el.id} className="flex" varaint="outline">
            {el.name}
            <ChevronRight />
          </Badge>
        );
      })}
    </div>
  );
};
