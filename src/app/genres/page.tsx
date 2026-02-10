import { Suspense } from "react";
import MovieGenreClient from "./_components/MovieGenreClient";

export default function MovieGenre() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <MovieGenreClient />
    </Suspense>
  );
}
