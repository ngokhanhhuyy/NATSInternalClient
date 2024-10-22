export interface IListRequestDto {
    page: number;
    resultsPerPage: number;
}

export interface IOrderableListRequestDto extends IListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
}