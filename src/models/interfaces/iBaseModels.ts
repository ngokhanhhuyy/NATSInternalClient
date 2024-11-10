import type { ListSortingOptionsModel } from "../listSortingModels";

declare global {
    interface IPaginatedListModel<TBasic extends IBasicModel> {
        page: number;
        resultsPerPage: number;
        pageCount: number;
        items: TBasic[];
    }
    
    interface ISortableListModel<TBasic extends IBasicModel>
            extends IPaginatedListModel<TBasic> {
        sortingByAscending: boolean | undefined;
        sortingByField: string | undefined;
        sortingOptions: ListSortingOptionsModel | undefined;
        mapFromSortingOptionsResponseDto(responseDto: ResponseDtos.List.SortingOptions): void;
    }
    
    interface IBasicModel {
        readonly id: number;
    }
}

export { };