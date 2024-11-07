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
        sortByAscending: boolean | undefined;
        sortByField: string | undefined;
        sortingOptions: ListSortingOptionsModel | undefined;
    }
    
    interface IBasicModel {
        readonly id: number;
    }
}

export { };