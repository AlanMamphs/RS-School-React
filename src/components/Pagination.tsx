import { useSearchParams } from 'react-router-dom';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
      setSearchParams((params) => {
        params.set('page', page.toString());
        return params;
      });
    }
  };

  const visiblePageNumbers = getVisiblePages();

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {visiblePageNumbers[0] > 1 && <span className="ellipsis">...</span>}
      {visiblePageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
        <span className="ellipsis">...</span>
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
