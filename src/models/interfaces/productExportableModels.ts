import type {
    ICustomerEngageableListModel,
    ICustomerEngageableDetailModel, ICustomerEngageableUpsertModel
} from "./customerEngageableModels";
import type { IFinancialEngageableAuthorizationModel,
    IFinancialEngageableBasicModel } from "./financialEngageableModels";
import type {
    IProductEngageableListModel,
    IProductEngageableDetailModel,
    IProductEngageableDetailItemModel,
    IProductEngageableUpsertItemModel,
    IProductEngageableUpdateHistoryModel,
    IProductEngageableItemUpdateHistoryModel, IProductEngageableUpsertModel
} from "./productEngageableModels";
import type { IUpsertableListAuthorizationModel } from "./upsertableModels";
import type { IHasMultiplePhotoUpsertModel, IUpsertPhotoModel } from "@/models/interfaces/";

export interface IProductExportableListModel<
            TBasicModel extends IFinancialEngageableBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends
            IProductEngageableListModel<
                TBasicModel,
                TListAuthorizationModel,
                TAuthorizationModel,
                TRequestDto,
                TResponseDto>,
            ICustomerEngageableListModel<
                TBasicModel,
                TListAuthorizationModel,
                TAuthorizationModel,
                TRequestDto,
                TResponseDto> {
    
}
export interface IProductExportableDetailModel<
            TItemModel extends IProductExportableDetailItemModel,
            TUpdateHistoryModel extends IProductEngageableUpdateHistoryModel<
                TItemUpdateHistoryModel>,
            TItemUpdateHistoryModel extends IProductEngageableItemUpdateHistoryModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends
            IProductEngageableDetailModel<
                TItemModel,
                TUpdateHistoryModel,
                TItemUpdateHistoryModel,
                TAuthorizationModel>,
            ICustomerEngageableDetailModel<
                TUpdateHistoryModel,
                TAuthorizationModel> {
    readonly productAmountBeforeVat: number;
    readonly productVatAmount: number;
    readonly amountBeforeVat: number;
    readonly vatAmount: number;
    readonly amountAfterVat: number;
}

export interface IProductExportableUpsertModel<
            TUpsertItemModel extends IProductExportableUpsertItemModel<TItemRequestDto>,
            TUpsertPhotoModel extends IUpsertPhotoModel<TPhotoRequestDto>,
            TRequestDto,
            TPhotoRequestDto,
            TItemRequestDto>
        extends
            IProductEngageableUpsertModel<TUpsertItemModel, TRequestDto, TItemRequestDto>,
            ICustomerEngageableUpsertModel<TRequestDto>,
            IHasMultiplePhotoUpsertModel<TUpsertPhotoModel, TPhotoRequestDto>{
}

export interface IProductExportableDetailItemModel extends IProductEngageableDetailItemModel {
    vatAmountPerUnit: number;
}

export interface IProductExportableUpsertItemModel<TRequestDto>
        extends IProductEngageableUpsertItemModel<TRequestDto> {
    vatPercentagePerUnit: number;
    readonly vatAmountPerUnit: number;
}

export interface IProductExportableUpdateHistoryModel<
            TItemUpdateHistoryModel extends IProductExportableItemUpdateHistoryModel>
        extends IProductEngageableUpdateHistoryModel<
            TItemUpdateHistoryModel> {
}

export interface IProductExportableItemUpdateHistoryModel
        extends IProductEngageableItemUpdateHistoryModel {
    vatAmountPerUnit: number;
}