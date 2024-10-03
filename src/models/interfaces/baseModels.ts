declare global {
    interface IListModel<TBasicModel extends IBasicModel, TRequestDto, TResponseDto> {
        orderByAscending: boolean;
        orderByField: string;
        page: number;
        resulstPerPage: number;
        pageCount: number;
        items: TBasicModel[];
        mapFromResponseDto(responseDto: TResponseDto): void;
        toRequestDto(): TRequestDto;
    }

    interface IBasicModel {
        readonly id: number;
    }
}

export { };