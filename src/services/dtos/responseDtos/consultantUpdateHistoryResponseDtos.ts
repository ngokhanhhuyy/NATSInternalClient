declare global {
    interface ConsultantUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldAmountBeforeVat: number;
        oldVatAmount: number;
        oldNote: string;
        newStatsDateTime: string;
        newAmountBeforeVat: number;
        newVatAmount: number;
        newNote: string;
    }
}

export { };