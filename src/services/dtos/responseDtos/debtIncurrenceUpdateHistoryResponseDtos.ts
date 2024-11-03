declare global {
    interface DebtIncurrenceUpdateHistoryResponseDto extends IDebtUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldAmount: number;
        oldNote: string;
        newStatsDateTime: string;
        newAmount: number;
        newNote: string;
    }
}

export { };