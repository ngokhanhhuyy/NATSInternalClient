declare global {
    class OrderUpdateHistoryResponseDto
            implements IProductExportableUpdateHistoryResponseDto<
                OrderItemUpdateHistoryDataDto> {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldNote: string | null;
        oldItems: OrderItemUpdateHistoryDataDto[] | null;
        newStatsDateTime: string;
        newNote: string | null;
        newItems: OrderItemUpdateHistoryDataDto[] | null;
    }
    
    class OrderItemUpdateHistoryDataDto implements IProductEngageableItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };