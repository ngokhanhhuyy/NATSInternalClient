declare global {
    namespace RequestDtos {
        interface IPaginatedList {
            page: number;
            resultsPerPage: number;
        }

        interface ISortablePaginatedList extends IPaginatedList {
            sortingByAscending: boolean;
            sortingByField: string;
        }

        type PartialImplements<T extends IPaginatedList, U extends T> = Partial<U>;
    }
}

export { };