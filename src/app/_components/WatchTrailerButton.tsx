"use client";

import { useEffect, useState } from "react";

type TrailerButtonProps = {
  movieId: number;
};

export const WatchTrailerButton = ({ movieId }: TrailerButtonProps) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDgxNDA5NGUwOWEyYmEzMDk5NmU1NzZhMmMzMmNmMCIsIm5iZiI6MTc2MzUyMzU0MS41NDgsInN1YiI6IjY5MWQzYmQ1ZjczYTcxODE4ZDU3Y2YzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l0ZY_yZWCxo6VylOrn9VohQfojM0Vj9ifSOTDE7WpWo`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        const trailer = data.results.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.log(error);
      }
    };

    getTrailer();
  }, [movieId]);

  if (!trailerKey) return null;

  return (
    <>
      <button
        className="w-[160px] h-12 bg-white text-black rounded-xl font-bold shadow-lg"
        onClick={() => setShowModal(true)}
      >
        Watch Trailer
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black w-[90%] md:w-[800px] h-[450px] relative rounded-lg">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
