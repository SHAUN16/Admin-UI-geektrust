import React from "react";
import classnames from 'classnames';
import { usePagination } from '../utils/usePagination';
import './pagination.scss';


const Pagination = ({
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
}) => {

    const getLastPage = () => {
        return Math.ceil(totalCount / pageSize);
    }

    let lastPage = getLastPage();


    const pageRange = usePagination({
        totalCount,
        currentPage,
        pageSize,
    });

    if (pageRange.length < 1 || currentPage === 0) {
        return null;
    }


    const goToFirstPage = () => {
        onPageChange((currentPage) => 1);
    }

    const goToLastPage = () => {
        onPageChange((currentPage) => lastPage);
    }

    const goToNextPage = () => {
        onPageChange((currentPage) => {
            let nextPage = currentPage + 1;
            if (nextPage > lastPage) return currentPage;
            return nextPage;
        });
    }

    const goToPreviousPage = () => {
        onPageChange((currentPage) => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) return currentPage;
            return prevPage;
        });
    }




    return (
        <div className="section-pagination">

            <ul className="pagination-container">
                <li className={`pagination-button ${currentPage === 1 ? 'disabled' : 'null'}`} onClick={goToFirstPage}>
                    <button className="first-page" disabled={currentPage === 1}>First Page</button>
                </li>
                <li className={`pagination-button ${currentPage === 1 ? 'disabled' : 'null'}`} onClick={goToPreviousPage}>
                    <div className="arrow left"></div>
                </li>
                {pageRange.map((page, idx) => {

                    return (
                        <li
                            key={idx}
                            className={`pagination-button ${page === currentPage ? 'action-btn' : 'null'}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </li>
                    );
                })}
                <li className={`pagination-button ${currentPage === lastPage ? 'disabled' : 'null'}`} onClick={goToNextPage}>
                    <div className="arrow right"></div>
                </li>
                <li className={`pagination-button ${currentPage === lastPage ? 'disabled' : 'null'}`} onClick={goToLastPage}>
                    <button className="last-page" disabled={currentPage === lastPage}>Last Page</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;