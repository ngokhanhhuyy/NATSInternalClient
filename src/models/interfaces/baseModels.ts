declare global {
    interface IListModel {
        page: number;
        resultsPerPage: number;
        pageCount: number;
        items: IBasicModel[];
        mapFromResponseDto(responseDto: IListResponseDto): void;
        toRequestDto(): IListRequestDto;
    }
    
    interface IOrderableListModel extends IListModel {
        orderByAscending: boolean;
        orderByField: string;
        toRequestDto(): IOrderableListRequestDto;
    }
    
    interface IBasicModel {
        readonly id: number;
    }
    
    interface IUpsertModel {
        toRequestDto(): any;
    }
}

export { };