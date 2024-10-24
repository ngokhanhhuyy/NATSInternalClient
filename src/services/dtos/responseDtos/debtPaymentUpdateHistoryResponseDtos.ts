declare global {
    export interface DebtPaymentUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldAmount: number;
        oldNote: string | null;
        newStatsDateTime: string;
        newAmount: number;
        newNote: string | null;
    }
}

export { };