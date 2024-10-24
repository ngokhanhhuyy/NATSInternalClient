declare global {
    interface IListRequestDto {
        page: number;
        resultsPerPage: number;
    }
    
    interface IOrderableListRequestDto extends IListRequestDto {
        orderByAscending: boolean;
        orderByField: string;
    }
}

export { };