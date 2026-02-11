"use client";

import { MovieSection } from "../../_components/Movie";
import { categories } from "../../_constants";
import { useState } from "react";
import { HomeScreenEnd } from "../../_components/HomeScreenEnd";
import { NextPrev } from "../../_components/Nextprev";
import { Header } from "../../_components/Header";
import { useParams } from "next/navigation";

const CategorySectionDetail = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const title =
    categories.find((el) => el.categoryPath === categoryName)?.categoryName ||
    "";

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
      <div className="">
        <MovieSection
          categoryName={title}
          categoryPath={categoryName ?? ""}
          hideSeeMore={true}
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

      <HomeScreenEnd />
    </>
  );
};

export default CategorySectionDetail;
