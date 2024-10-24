declare global {
    interface IFinancialEngageableListRequestDto extends ICreatorTrackableListRequestDto {
        year: number | null;
        month: number | null;
        ignoreMonthYear: boolean;
    }
    
    interface IFinancialEngageableUpsertRequestDto {
        statsDateTime: string | null;
        note: string | null;
        updatedReason: string | null;
    }
}

export { };