declare global {
    interface IProductExportableBasicResponseDto
            extends ICustomerEngageableBasicResponseDto {}
    
    interface IProductExportableDetailResponseDto
            extends IProductEngageableDetailResponseDto, ICustomerEngageableBasicResponseDto {
        updateHistories: IProductExportableUpdateHistoryResponseDto[] | null;
    }
    
    interface IProductExportableUpdateHistoryResponseDto
            extends IProductEngageableUpdateHistoryResponseDto {
        oldItems: IProductExportableItemUpdateHistoryDataDto[] | null;
        newItems: IProductExportableItemUpdateHistoryDataDto[] | null;
    }
    
    interface IProductExportableItemUpdateHistoryDataDto
            extends IProductEngageableItemUpdateHistoryDataDto {
        vatAmountPerUnit: number;
    }
}

export { };