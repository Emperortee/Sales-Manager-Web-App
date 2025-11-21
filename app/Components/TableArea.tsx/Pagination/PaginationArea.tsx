"use client";

import { Button } from "@/components/ui/button";

import { GrFormPrevious, GrFormNext } from "react-icons/gr"; 
import { BiFirstPage, BiLastPage } from "react-icons/bi"; 

import { useTheme } from "next-themes"; 
import  PaginationSelection from "./PaginationSelection";
import { useEffect, useState } from "react"; 

export default function PaginationArea() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`relative w-full h-[80px] max-sm:h-[200px] max-sm:pt-4 max-sm:pb-4
      overflow-hidden flex justify-between items-center px-6 ${bgColor}
      border-t max-sm:flex-col max-sm:gap-2`}
    >
      <PaginationSelection />
      <div className="flex items-center max-sm:flex-col max-sm:mt-4 max-sm:gap-2">
        <span className="text-sm text-gray-500">Page 1 of 3</span>
        <div className="flex items-center justify-end space-x-2">
          {/* First Page Button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            // onClick={() => table.setPageIndex(0)}
            // disabled={!table.getCanPreviousPage()}
          >
            <BiFirstPage />
          </Button>

          {/* Previous Page Button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            // onClick(() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            <GrFormPrevious />
          </Button>

          {/* Next Page Button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            <GrFormNext />
          </Button>

          {/* Last Page Button */}
          <Button
            variant="outline"
            className="size-9 w-12"
            size="sm"
            // onClick(() => table.setPageIndex(table.getPageCount() - 1)}
            // disabled={!table.getCanNextPage()}
          >
            <BiLastPage />
          </Button>
        </div>
      </div>
    </div>
  );
}