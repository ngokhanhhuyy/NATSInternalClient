declare global {
    interface TreatmentUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldServiceAmount: number;
        oldServiceVatAmount: number;
        oldNote: string | null;
        oldTherapist: UserBasicResponseDto;
        oldItems: TreatmentItemUpdateHistoryDataDto[] | null;
        newStatsDateTime: string;
        newServiceAmount: number;
        newServiceVatAmount: number;
        newNote: string | null;
        newTherapist: UserBasicResponseDto;
        newItems: TreatmentItemUpdateHistoryDataDto[] | null;
    }
    
    interface TreatmentItemUpdateHistoryDataDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        productName: string;
    }
}

export { };