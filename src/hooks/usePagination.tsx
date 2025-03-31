import { useState } from "react";

const usePagination = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(0);

     const handlePageChange = (page : number) => {
        setCurrentPage(page);
     };

     const updateTotalpages = (newTotalPages: number) => {
        setTotalPages(newTotalPages);
     };

     return {
        currentPage,
        totalPages,
        handlePageChange,
        updateTotalpages,
     };
};

export default usePagination;