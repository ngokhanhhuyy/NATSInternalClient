export interface PaginationRange {
    startingPage: number;
    endingPage: number;
}

export interface PaginationRangeOptions {
    currentPage: number;
    pageCount: number;
    visibleButtons: number;
}

export class PaginationUtility {
    getPaginationRange(options: PaginationRangeOptions): PaginationRange {
        let startingPage: number;
        let endingPage: number;
        if (options.pageCount >= options.visibleButtons) {
            if (options.currentPage - Math.floor(options.visibleButtons / 2) <= 1) {
                startingPage = 1;
                endingPage = startingPage + (options.visibleButtons - 1);
            } else if (options.currentPage + Math.floor(options.visibleButtons / 2) > options.pageCount) {
                endingPage = options.pageCount;
                startingPage = endingPage - (options.visibleButtons - 1);
            } else {
                startingPage = Math.ceil(options.currentPage - options.visibleButtons / 2);
                endingPage = Math.floor(options.currentPage + options.visibleButtons / 2);
            }
        } else {
            startingPage = 1;
            endingPage = options.pageCount;
        }

        return {
            startingPage: startingPage,
            endingPage: endingPage
        };
    } 
}

export function usePaginationUtility() {
    return new PaginationUtility();
}