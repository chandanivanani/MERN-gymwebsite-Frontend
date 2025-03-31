import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange} : PaginationProps) => {

const renderPageNumbers = () => {
    const maxButtons = 4;
    const pageNumbers = [];

    if(totalPages <= maxButtons){
        for(let i=1; i<= totalPages; i++) {
            pageNumbers.push(
                <li key={i}>
                   <button
                      onClick={() => onPageChange(i)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border bg-surface-200 border-surface-300 text-gray-200 hover:bg-gray-700 hover:text-white ${currentPage === i ? 'bg-surface-300' : ''}`}
                   >
                     {i}
                   </button>
                </li>

            );
        }
    } else {
        const start = Math.max(currentPage - Math.floor(maxButtons/2),1);
        const end = Math.min(start + maxButtons - 1,totalPages);

        for( let i=start ; i<= end; i++) {
            pageNumbers.push(
                <li key={i}>
                   <button
                      onClick={() => onPageChange(i)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border bg-surface-200 border-surface-300 text-gray-200 hover:bg-gray-700 hover:text-white ${currentPage === i ? 'text-blue-600 bg-surface-300' : ''}`}
                    >
                   {i}
                   </button>
                </li>
            );
        }
    }
    return pageNumbers;
};

return (
    <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
            <li>
                <button
                   onClick={() => onPageChange(currentPage - 1)}
                   disabled= {currentPage === 1}
                   className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-surface-200 border-surface-300 text-gray-200 hover:bg-gray-700 hover:text-white "
                >
                  <ArrowBackIosIcon/>
                </button>
            </li>
            {renderPageNumbers()}
            <li>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg bg-surface-200 border-surface-300 text-gray-200 hover:bg-gray-700 hover:text-white "
                >
                    <ArrowForwardIosIcon/>
                </button>
            </li>
        </ul>
    </nav>
);
};

export default Pagination;