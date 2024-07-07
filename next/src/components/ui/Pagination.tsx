import { useAuth } from "@/stores/authStore";
import { useProducts } from "@/stores/productsStore";
import { generatePageNumbers } from "@/utils/functions";
import { iconsPagination } from "@/assets/icons"
import { FC, useState } from "react";

interface IPagination {
    currentPage: number,
    onPageChange: (page: number) => void
    searchQuery: string
}
export const Pagination: FC<IPagination> = ({ currentPage, onPageChange, searchQuery }) => {

    const totalPages = useProducts((state) => state.totalPages);

    const pagesDisplay = generatePageNumbers(currentPage, totalPages);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1)
        }
    };

    return (
        <div className="flex justify-center items-center gap-x-2.5">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                {iconsPagination[0]}
            </button>
            {pagesDisplay.map((page: number | string, index: number) => {
                return (
                    <button
                        key={index}
                        disabled={page === '...'}
                        onClick={() => handlePageChange(Number(page))}
                        className={`${page === currentPage ? "bg-slate-200" : ""} w-5 h-5 flex justify-center items-center rounded-sm text-slate-900 leading-5`}
                    >
                        {page}
                    </button>
                )
            })}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                {iconsPagination[1]}
            </button>
        </div>

    )
}