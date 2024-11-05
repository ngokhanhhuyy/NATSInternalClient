declare global {
    namespace RequestDtos {
        interface IPaginatedList {
            page: number;
            resultsPerPage: number;
        }

        interface ISortablePaginatedList extends IPaginatedList {
            sortByAscending: boolean;
            sortByField: string;
        }

        type PartialImplements<T extends IPaginatedList, U extends T> = Partial<U>;
    }
}

export { };