"use client";

import { useEffect, useState } from "react";

type TrailerButtonProps = {
  movieId: number;
};

export const WatchTrailerButton = ({ movieId }: TrailerButtonProps) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ movieId солигдоход өмнөх state-г цэвэрлэнэ
  useEffect(() => {
    setTrailerKey(null);
    setShowModal(false);
  }, [movieId]);

  useEffect(() => {
    let cancelled = false;

    const getTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN ?? ""}`,
              accept: "application/json",
            },
          },
        );

        if (!res.ok) return;

        const data = await res.json();
        const trailer = data?.results?.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (!cancelled) {
          setTrailerKey(trailer?.key ?? null);
        }
      } catch (e) {
        if (!cancelled) setTrailerKey(null);
      }
    };

    getTrailer();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (!trailerKey) return null;

  return (
    <>
      <button
        className="w-[160px] h-12 bg-white text-black rounded-xl font-bold shadow-lg"
        onClick={() => setShowModal(true)}>
        Watch Trailer
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black w-[90%] md:w-[800px] h-[450px] relative rounded-lg">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold"
              onClick={() => setShowModal(false)}>
              &times;
            </button>

            {/* ✅ key өгөөд iframe-г шинэчлүүлнэ */}
            <iframe
              key={`${movieId}-${trailerKey}`}
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
