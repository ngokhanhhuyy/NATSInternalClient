import type { IUpsertableAuthorizationModel,
    IUpsertableListAuthorizationModel } from "./upsertableModels";
import type { ILockableListModel, ILockableBasicModel, ILockableDetailModel,
    ILockableAuthorizationModel } from "./lockableModels";
import type { ICustomerConsumingBasicModel,
    ICustomerConsumingListModel } from "./customerConsumingModels";
import type { IProductConsumingListModel,
    IProductConsumingItemModel } from "./productConsumingModels";

export interface IExportableListModel<
            TBasicModel extends IExportableBasicModel<TAuthorizationModel>,
            TAuthorizationModel extends IUpsertableAuthorizationModel,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends
            ILockableListModel<
                TBasicModel,
                TAuthorizationModel,
                TListAuthorizationModel,
                TRequestDto,
                TResponseDto>,
            ICustomerConsumingListModel,
            IProductConsumingListModel {
    customerId: number | null;
    productId: number | null;
}

export interface IExportableBasicModel<
            TAuthorizationModel extends IUpsertableAuthorizationModel>
        extends
            ILockableBasicModel<TAuthorizationModel>,
            ICustomerConsumingBasicModel {
    readonly paidDateTime: IDateTimeDisplayModel;
    readonly amount: number;
}

export interface IExportableDetailModel<
            TItemModel extends IProductConsumingItemModel,
            TAuthorizationModel extends ILockableAuthorizationModel>
        extends
            IExportableBasicModel<TAuthorizationModel>,
            ILockableDetailModel<TAuthorizationModel> {
    
}
