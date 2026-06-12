interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Previous
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() =>
                            onPageChange(index + 1)
                        }
                        className={`px-4 py-2 border rounded ${currentPage === index + 1
                                ? "bg-black text-white"
                                : ""
                            }`}
                    >
                        {index + 1}
                    </button>
                )
            )}

            <button
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;