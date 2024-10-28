declare global {
    interface IProductEngageableDetailResponseDto
            extends IFinancialEngageableDetailResponseDto, IHasMultiplePhotosDetailResponseDto {
        items: IProductEngageableItemResponseDto[] | null;
        updateHistories: IProductEngageableUpdateHistoryResponseDto[] | null;
    }
    
    interface IProductEngageableItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto;
    }
    
    interface IProductEngageableUpdateHistoryResponseDto
            extends IFinancialEngageableUpdateHistoryResponseDto {
        oldItems: IProductEngageableItemUpdateHistoryDataDto[] | null;
        newItems: IProductEngageableItemUpdateHistoryDataDto[] | null;
    }
    
    interface IProductEngageableItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };