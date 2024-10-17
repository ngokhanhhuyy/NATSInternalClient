import type { ICustomerEngageableListModel,
    ICustomerEngageableDetailModel } from "./customerEngageableModels";
import type { IFinancialEngageableAuthorizationModel,
    IFinancialEngageableBasicModel } from "./financialEngageableModels";
import type { IProductEngageableListModel, IProductEngageableDetailModel,
    IProductEngageableDetailItemModel,
    IProductEngageableUpsertItemModel } from "./productEngageableModels";
import type { IUpsertableListAuthorizationModel } from "./upsertableModels";

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
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            >
        extends
            IProductEngageableDetailModel<TItemModel, TAuthorizationModel>,
            ICustomerEngageableDetailModel<TAuthorizationModel> {
    readonly productAmountBeforeVat: number;
    readonly productVatAmount: number;
    readonly amountBeforeVat: number;
    readonly vatAmount: number;
    readonly amountAfterVat: number;
}

export interface IProductExportableDetailItemModel extends IProductEngageableDetailItemModel {
    productVatAmountPerUnit: number;
}

export interface IProductExportableUpsertItemModel<TRequestDto>
        extends IProductEngageableUpsertItemModel<TRequestDto> {
    productVatPercentagePerUnit: number;
    readonly productVatAmountPerUnit: number;
}