import { useMemo } from "react"

export const DOTS = 'DOTS'


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
    currentPage,
}) => {
    const paginationRange = useMemo(() => {
        const totalNumberOfPages = Math.ceil(totalCount/pageSize);

        const totalPageSlots = 5;

        const leftMostButton = Math.max(currentPage - 4,1);
        
        if(totalNumberOfPages <= totalPageSlots){
            return getRange(1, totalNumberOfPages);
        }

        else
        {
                let buttonRange = getRange(leftMostButton, leftMostButton+4);
                return buttonRange;
        }
        


    }, [totalCount, pageSize, currentPage]); // useMemo can recalculate the above range every time one of these variables change. Unlike useEffect , useMemo is a computationally cheaper operation. 

    return paginationRange;

}