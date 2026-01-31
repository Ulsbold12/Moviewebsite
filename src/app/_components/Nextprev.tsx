"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/src/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const NextPrev = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  const nextPage = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const goTo = (page: number) => setCurrentPage(page);

  return (
    <div className="flex justify-center mt-10 ">
      <Pagination className="w-fit m-0">
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl disabled:opacity-50">
              Prev
            </button>
          </PaginationItem>

          <PaginationItem>
            <button
              onClick={() => goTo(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl disabled:opacity-50">
              {Math.max(currentPage - 1, 1)}
            </button>
          </PaginationItem>

          <PaginationItem>
            <button className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl">
              {currentPage}
            </button>
          </PaginationItem>

          <PaginationItem>
            <button
              onClick={() => goTo(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl disabled:opacity-50">
              {Math.min(currentPage + 1, totalPages)}
            </button>
          </PaginationItem>

          <PaginationItem>
            <button
              onClick={() => goTo(totalPages)}
              className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl">
              {totalPages}
            </button>
          </PaginationItem>

          <PaginationItem>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="w-[90px] h-[30px] bg-black text-white font-bold rounded-2xl disabled:opacity-50">
              Next
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
