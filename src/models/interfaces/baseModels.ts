export interface IListModel<TBasicModel extends IBasicModel, TRequestDto, TResponseDto> {
    orderByAscending: boolean;
    orderByField: string;
    page: number;
    resultsPerPage: number;
    pageCount: number;
    items: TBasicModel[];
    mapFromResponseDto(responseDto: TResponseDto): void;
    toRequestDto(): TRequestDto;
}

export interface IBasicModel {
    readonly id: number;
}