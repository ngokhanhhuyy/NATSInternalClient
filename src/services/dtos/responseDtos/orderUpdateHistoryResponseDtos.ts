declare global {
    export interface OrderUpdateHistoryResponseDto {
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
    
    export interface OrderItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };