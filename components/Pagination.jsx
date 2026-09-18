import { ChevronRight } from "lucide-react";
import Link from "next/link";
const Pagination = ({ currentPage, URL, numberOfPages, searchParams }) => {
  const boxs = Array.from({ length: 4 });

  // console.log(searchParams);

  const moveTo = (nextOrPrevPage) => {
    const newParams = new URLSearchParams({
      ...searchParams,
      page: String(nextOrPrevPage),
    });
    return `${URL}?${newParams.toString()}`;
  };

  console.log("NEW   --  URL".bgRed, moveTo(currentPage));

  return (
    <div className=" max-w-fit p-1 flex gap-2">
      <Link
        //`${URL}?page=${Number(currentPage) - 1}`
        href={moveTo(currentPage - 1)}
        aria-disabled={currentPage <= 1}
      >
        <ChevronRight
          className={`${currentPage <= 1 ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"}  rotate-180 `}
        />
      </Link>
      {/* {boxs.map((_, dx) => {
        return (
          <div
            className="size-6 border p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:text-white"
            key={dx + 1}
          >
            {dx + 1}
          </div>
        );
      })} */}
      <Link
        href={moveTo(currentPage + 1)}
        aria-disabled={currentPage >= numberOfPages}
      >
        <ChevronRight
          className={`${currentPage >= numberOfPages ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"} `}
        />
      </Link>
    </div>
  );
};

export default Pagination;
