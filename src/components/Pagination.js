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
    className,
}) => {

    const pageRange = usePagination({
        totalCount,
        currentPage,
        pageSize,
        siblings,
    });

    if (pageRange.length < 1 || currentPage === 0 ) {
        return null;
    }

    let lastPage = pageRange[pageRange.length - 1];
    
    const goToFirstPage = () =>{
        onPageChange((currentPage)=>1);
    }

    const goToLastPage = () =>{
        onPageChange((currentPage)=>lastPage);
    }

    const goToNextPage = () => {
        onPageChange((currentPage)=>currentPage + 1);
    }

    const goToPreviousPage = () => {
        onPageChange((currentPage)=>currentPage - 1);
    }


    //classnames is a third-party package which is a solution for css in js

    return (
        <ul className={classnames('pagination-container', { [className]: className })}>
            <li
                className={classnames('pagination-button', { disabled: currentPage === 1 })}
                onClick={goToFirstPage}
            >
                <button className="first-page" disabled={currentPage===1}>First Page</button>
            </li>
            <li
                className={classnames('pagination-button', { disabled: currentPage === 1 })}
                onClick={goToPreviousPage}
            >
                <div className="arrow left"></div>
            </li>
            {pageRange.map((page,idx) => {
                if (page === DOTS)
                    return <li key= {idx} className="pagination-button dots">&#8230;</li>;

                return (
                    <li key = {idx}
                        className={classnames('pagination-button', { selected: page === currentPage })}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </li>
                )
            })}
            <li
                className={classnames('pagination-button', { disabled: currentPage === lastPage })}
                onClick={goToNextPage}
            >
                <div className="arrow right"></div>
            </li>
            <li
                className={classnames('pagination-button', { disabled: currentPage === lastPage })}
                onClick={goToLastPage}
            >
                <button className="last-page"  disabled={ currentPage === lastPage}>Last Page</button>
            </li>
        </ul>
    )
}

export default Pagination;