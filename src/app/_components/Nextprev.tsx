"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/src/components/ui/pagination";

export const NextPrev = ({ currentPage, totalPage }: MovieSectionProps) => {
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <>
      <div className="flex justify-end">
        <Pagination className="w-fit m-0">
          <PaginationContent>
            <PaginationItem>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                Prev
              </button>
            </PaginationItem>

            <PaginationItem>
              <button
                onClick={prevPage}
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                {currentPage - 1}
              </button>
            </PaginationItem>

            <PaginationItem>
              <button
                variant="defailt"
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                {currentPage}
              </button>
            </PaginationItem>

            <PaginationItem>
              <button
                onClick={nextPage}
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                {currentPage + 1}
              </button>
            </PaginationItem>

            <PaginationItem>
              <button
                onClick={prevPage}
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                {totalPage}
              </button>
            </PaginationItem>

            <PaginationItem>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPage}
                className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl"
              >
                Next
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
