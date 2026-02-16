"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/src/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type PageItem = number | "dots";

function buildPages(current: number, total: number): PageItem[] {
  if (total <= 8) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: PageItem[] = [];
  const window = 2; // current-ийн хоёр талд хэдийг харуулах вэ
  const left = Math.max(2, current - window);
  const right = Math.min(total - 1, current + window);

  items.push(1);

  if (left > 2) items.push("dots");

  for (let p = left; p <= right; p++) items.push(p);

  if (right < total - 1) items.push("dots");

  items.push(total);

  return items;
}

export const NextPrev = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  const goTo = (p: number) =>
    setCurrentPage(Math.min(Math.max(p, 1), totalPages));

  const pages = buildPages(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 grid place-items-center rounded-full border bg-white hover:bg-gray-50 transition disabled:opacity-40"
              aria-label="Previous page">
              <ChevronLeft size={16} className="text-black" />
            </button>
          </PaginationItem>

          {pages.map((it, idx) => {
            if (it === "dots") {
              return (
                <PaginationItem key={`dots-${idx}`}>
                  <span className="h-9 px-2 grid place-items-center text-gray-400 select-none">
                    …
                  </span>
                </PaginationItem>
              );
            }

            const isActive = it === currentPage;

            return (
              <PaginationItem key={it}>
                <button
                  onClick={() => goTo(it)}
                  className={[
                    "h-9 min-w-9 px-3 rounded-full text-sm font-medium transition",
                    isActive
                      ? "bg-black text-white"
                      : "border bg-white text-black hover:bg-gray-50",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}>
                  {it}
                </button>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 grid place-items-center rounded-full border bg-white hover:bg-gray-50 transition disabled:opacity-40"
              aria-label="Next page">
              <ChevronRight size={16} className="text-black" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-xs text-gray-500">
        Page <span className="font-medium text-gray-700">{currentPage}</span> /{" "}
        <span className="font-medium text-gray-700">{totalPages}</span>
      </div>
    </div>
  );
};
