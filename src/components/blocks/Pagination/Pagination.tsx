"use client";

interface PaginationProps {
  page: number;
  total: number;
  count: number;
  visiblePages: number; // page window
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  count,
  visiblePages,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / count);

  let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
  let endPage = Math.min(startPage + visiblePages - 1, totalPages);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center my-4">
      <ul className="flex space-x-2">
        <li>
          <button
            className="px-4 py-2 text-white rounded-md btn-primary btn"
            disabled={page === 1}
            onClick={() =>
              onPageChange(Math.max(1, endPage - visiblePages - 1))
            }
          >
            이전
          </button>
        </li>
        {pageRange.map((pageNumber) => (
          <li key={`page-${pageNumber}`}>
            <button
              className={`btn px-4 py-2 rounded-md ${
                page === pageNumber
                  ? "btn-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-4 py-2 text-white rounded-md btn btn-primary"
            disabled={page === totalPages}
            onClick={() =>
              onPageChange(Math.min(totalPages, startPage + visiblePages))
            }
          >
            다음
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
