declare global {
    class SupplyUpdateHistoryResponseDto
            implements IProductEngageableUpdateHistoryResponseDto<
                SupplyItemUpdateHistoryDataDto> {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldShipmentFee: number;
        oldNote: string | null;
        oldItems: SupplyItemUpdateHistoryDataDto[] | null;
        newStatsDateTime: string;
        newShipmentFee: number;
        newNote: string | null;
        newItems: SupplyItemUpdateHistoryDataDto[] | null;
    }
    
    class SupplyItemUpdateHistoryDataDto implements IProductEngageableItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };