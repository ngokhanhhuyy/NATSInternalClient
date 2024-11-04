declare global {
    interface IProductEngageableDetailResponseDto<
                TItem extends IProductEngageableItemResponseDto,
                TPhoto extends IPhotoResponseDto,
                TUpdateHistory
                    extends IProductEngageableUpdateHistoryResponseDto<TItemUpdateHistory>,
                TItemUpdateHistory extends IProductEngageableItemUpdateHistoryDataDto,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends
                IFinancialEngageableDetailResponseDto<TUpdateHistory, TAuthorization>,
                IHasMultiplePhotosDetailResponseDto<TPhoto>{
        items: TItem[];
    }
    
    interface IProductEngageableItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto;
    }
    
    interface IProductEngageableUpdateHistoryResponseDto<
                TItemUpdateHistory extends IProductEngageableItemUpdateHistoryDataDto>
            extends IFinancialEngageableUpdateHistoryResponseDto {
        oldItems: TItemUpdateHistory[] | null;
        newItems: TItemUpdateHistory[] | null;
    }
    
    interface IProductEngageableItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };