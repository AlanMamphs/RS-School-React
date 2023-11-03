import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { id } = useParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const visiblePages = 5;

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(visiblePages / 2);
      if (currentPage <= half) {
        for (let i = 1; i <= visiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage > totalPages - half) {
        for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const start = currentPage - half;
        const end = currentPage + half;
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (!id) {
        setSearchParams((params) => {
          params.set('page', page.toString());
          return params;
        });
      } else {
        navigate(`/products?page=${page}`);
      }
    }
  };

  const visiblePageNumbers = getVisiblePages();
  const activePageClass =
    'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
  const inactivePageClass =
    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
  const elipsisClass =
    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ';
  return (
    <div className="m-8">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>

        {visiblePageNumbers[0] > 1 && (
          <li>
            <button disabled className={elipsisClass}>
              ...
            </button>
          </li>
        )}
        {visiblePageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={
                page === currentPage ? activePageClass : inactivePageClass
              }
            >
              {page}
            </button>
          </li>
        ))}
        {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
          <li>
            <button disabled className={elipsisClass}>
              ...
            </button>
          </li>
        )}

        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
