export interface IListModel<
        TBasicModel extends IBasicModel,
        TRequestDto,
        TResponseDto> {
    page: number;
    resultsPerPage: number;
    pageCount: number;
    items: TBasicModel[];
    mapFromResponseDto(responseDto: TResponseDto): void;
    toRequestDto(): TRequestDto;
}

export interface IOrderableListModel<
            TBasicModel extends IBasicModel,
            TRequestDto,
            TResponseDto>
        extends IListModel<TBasicModel, TRequestDto, TResponseDto> {
    orderByAscending: boolean;
    orderByField: string;
}

export interface IBasicModel {
    readonly id: number;
}

export interface IUpsertModel<TRequestDto> {
    toRequestDto(): TRequestDto;
}