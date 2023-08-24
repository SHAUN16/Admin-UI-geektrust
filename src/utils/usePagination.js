import { useMemo } from "react"

export const DOTS = 'DOTS';

const getRange = (start, end) => {
    let length = end - start + 1;
    let rangeArray = new Array(length).fill(0);
    for (let i = 0; i < rangeArray.length; i++) {
        rangeArray[i] = i + start;
    }

    return rangeArray;
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblings = 1,
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        // implementation logic

        // get the total number of pages
        const pageCount = Math.ceil(totalCount / pageSize);

        // number of page slots to be displayed (DOTS and Pages Numbers) are defaulted to 5, it means that there will not be scrolling for pages from 1-5
        const totalPageSlots = siblings + 5;

        // Keep track of the first page and last page
        const firstPageIndex = 1;
        const lastPageIndex = pageCount;

        //keep track of the left most sibling and rightmost sibling to the current page to be displayed
        const leftMostSiblingIndex = Math.max(currentPage - siblings, 1);
        const rightMostSiblingIndex = Math.min(currentPage + siblings, pageCount);

        /*conditionally render the left / right DOTS if the left most sibling is alteast 3 pages 
        from the first page or the right most sibling is atleast 3 pages from the last page.*/
        const shouldShowLeftDots = (leftMostSiblingIndex > 2);
        const shouldShowRightDots = (rightMostSiblingIndex < (pageCount - 2));

        // if the number of slots is greater than equal to the pageCount calculated, return the range of pages for pageCount 
        if (totalPageSlots >= pageCount) {
            return getRange(1, pageCount);
        }
        
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = getRange(leftMostSiblingIndex - 1, rightMostSiblingIndex + 1);
            return [...middleRange];
        }

        else if (shouldShowRightDots) {
            let leftItemCount = (2 * siblings) + 3;
            let leftRange = getRange(1, leftItemCount);
            return [...leftRange];
        }

        else if (shouldShowLeftDots) {
            let rightItemCount = 2 * siblings + 3;
            let rightRange = getRange(pageCount - rightItemCount + 1, pageCount);
            return [...rightRange];
        }




    }, [totalCount, pageSize, siblings, currentPage]); // useMemo can recalculate the above range every time one of these variables change. Unlike useEffect , useMemo is a computationally cheaper operation. 

    return paginationRange;

}