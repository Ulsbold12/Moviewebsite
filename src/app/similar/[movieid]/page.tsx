"use client";
import { useState } from "react";
import { MoreLikeSection } from "../../_components/MoreLikeSection";
import { NextPrev } from "../../_components/Nextprev";
import { Header } from "../../_components/Header";
import { useParams } from "next/navigation";
import { HomeScreenEnd } from "../../_components/HomeScreenEnd";

const SimilarPage = () => {
  const { movieid } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <MoreLikeSection
        movieId={Number(movieid)}
        limit={10}
        currentPage={currentPage}
        onTotalPagesChange={setTotalPages}
      />

      <NextPrev
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <HomeScreenEnd />
    </div>
  );
};

export default SimilarPage;
