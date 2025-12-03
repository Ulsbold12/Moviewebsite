"use client";

import { use } from "react";
import { MovieSection } from "../../_components/Movie";
import { categories } from "../../_constants";
import { useState } from "react";
import { Header } from "../../_components/header";
import { PaginationDemo } from "../../_components/PaginationDemo";
import { Pagination } from "@/src/components/ui/pagination";

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

  return (
    <>
      <div className="">
        <Header />
        <MovieSection
          categoryName={title}
          categoryPath={categoryName}
          hideSeeMore={true}
          limit={10}
        />
      </div>
      <div className="mt-10 flex">
        <PaginationDemo />
      </div>
    </>
  );
};

export default CategorySectionDetail;
