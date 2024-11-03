declare global {
    interface IListRequestDto {
        page?: number;
        resultsPerPage?: number;
    }
    
    interface ISortableListRequestDto extends IListRequestDto {
        orderByAscending?: boolean;
        orderByField?: string;
    }
}

export { };