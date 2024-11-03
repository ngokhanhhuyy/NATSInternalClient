import type { ListSortingOptionsModel } from "../listSortingModels";

declare global {
    interface IListModel<TBasic extends IBasicModel> {
        page: number;
        resultsPerPage: number;
        pageCount: number;
        items: TBasic[];
    }
    
    interface ISortableListModel<TBasic extends IBasicModel> extends IListModel<TBasic> {
        sortingByAscending?: boolean;
        sortingByField?: string;
        sortingOptions?: ListSortingOptionsModel;
    }
    
    interface IBasicModel {
        readonly id: number;
    }
}

export { };