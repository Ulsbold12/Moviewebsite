"use client";

import { use } from "react";
import { MovieSection } from "../../_components/Movie";
import { categories } from "../../_constants";
import { useState } from "react";
import { Header } from "../../_components/header";
import { PaginationDemo } from "../../_components/PaginationDemo";
import { Pagination } from "@/src/components/ui/pagination";
import { HomeScreenEnd } from "../../_components/HomeScreenEnd";
import { NextPrev } from "../../_components/Nextprev";

const CategorySectionDetail = ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = use(params);
  const title =
    categories.find((el) => el.categoryPath === categoryName)?.categoryName ||
    "";
  const [hideSeeMore, setHideSeeMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
      <div className="">
        <Header />
        <MovieSection
          categoryName={title}
          categoryPath={categoryName}
          hideSeeMore={true}
          limit={10}
          currentPage={currentPage}
          onTotalPages={setTotalPages}
        />

        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPage))}
            disabled={currentPage === totalPage}>
            Next
          </button>
        </div>
      </div>

      <HomeScreenEnd />
    </>
  );
};

export default CategorySectionDetail;
