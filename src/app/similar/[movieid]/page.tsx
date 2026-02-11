"use client";
import { use, useState } from "react";
import { MoreLikeSection } from "../../_components/MoreLikeSection";
import { NextPrev } from "../../_components/Nextprev";
import { Header } from "../../_components";

const SimilarPage = ({ params }: { params: Promise<{ movieid: string }> }) => {
  const { movieid } = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <Header />

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
    </div>
  );
};

export default SimilarPage;
