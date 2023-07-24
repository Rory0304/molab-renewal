"use client";

interface PaginationProps {
  page: number;
  total: number;
  count: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  count,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / count);
  const visiblePages = 5;

  let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  let endPage = Math.min(startPage + visiblePages - 1, totalPages);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const showEllipsisStart = startPage > 1;
  const showEllipsisEnd = endPage < totalPages;

  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <nav className="flex items-center justify-center my-4">
      <ul className="flex space-x-2">
        <li>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            disabled={page === 1}
            onClick={() => onPageChange(page - 10)}
          >
            이전
          </button>
        </li>
        {showEllipsisStart && <li>...</li>}
        {pageRange.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`px-4 py-2 rounded-md ${
                page === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => onPageChange((pageNumber - 1) * 10)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {showEllipsisEnd && <li>...</li>}
        <li>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 10)}
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
