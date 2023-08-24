import React from "react";
import classnames from 'classnames';
import { usePagination, DOTS } from '../utils/usePagination';
import './pagination.scss';

const Pagination = ({
    onPageChange,
    totalCount,
    siblings = 1,
    currentPage,
    pageSize,
}) => {

    const pageRange = usePagination({
        totalCount,
        currentPage,
        pageSize,
        siblings,
    });

    if (pageRange.length < 1 || currentPage === 0) {
        return null;
    }

    let lastPage = pageRange[pageRange.length - 1];

    const goToFirstPage = () => {
        onPageChange((currentPage) => 1);
    }

    const goToLastPage = () => {
        onPageChange((currentPage) => lastPage);
    }

    const goToNextPage = () => {
        onPageChange((currentPage) => currentPage + 1);
    }

    const goToPreviousPage = () => {
        onPageChange((currentPage) => currentPage - 1);
    }


    //classnames is a third-party package which is a solution for css in js

    return (
        <ul className="pagination-container">
            <li className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToFirstPage}>
                <button className="first-page" disabled={currentPage === 1}>First Page</button>
            </li>
            <li className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPreviousPage}>
                <div className="arrow left"></div>
            </li>
            {pageRange.map((page, idx) => {
                return (
                    <li
                        key={idx}
                        className={`pagination-button ${page === currentPage ? 'selected' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </li>
                );
            })}
            <li className={`pagination-button ${currentPage === lastPage ? 'disabled' : ''}`} onClick={goToNextPage}>
                <div className="arrow right"></div>
            </li>
            <li className={`pagination-button ${currentPage === lastPage ? 'disabled' : ''}`} onClick={goToLastPage}>
                <button className="last-page" disabled={currentPage === lastPage}>Last Page</button>
            </li>
        </ul>
    )
}

export default Pagination;