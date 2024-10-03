import type { CustomerBasicModel } from "@/models";
import type { IUpsertableAuthorizationModel,
    IUpsertableListAuthorizationModel } from "./upsertableModels";
import type { ILockableListModel, ILockableBasicModel,
    ILockableAuthorizationModel } from "./lockableModels";

export interface IExportableListModel<
            TBasicModel extends IExportableBasicModel<TAuthorizationModel>,
            TAuthorizationModel extends ILockableAuthorizationModel,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends ILockableListModel<
            TBasicModel,
            TAuthorizationModel,
            TListAuthorizationModel,
            TRequestDto,
            TResponseDto> {
    customerId: number | null;
    productId: number | null;
}

export interface IExportableBasicModel<
            TAuthorizationModel extends IUpsertableAuthorizationModel>
        extends ILockableBasicModel<TAuthorizationModel> {
    readonly paidDateTime: IDateTimeDisplayModel;
    readonly amount: number;
    readonly isLocked: boolean;
    readonly customer: CustomerBasicModel;
}