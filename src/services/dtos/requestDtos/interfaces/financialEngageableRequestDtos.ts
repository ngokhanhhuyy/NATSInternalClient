declare global {
    interface IFinancialEngageableListRequestDto extends ICreatorTrackableListRequestDto {
        monthYear?: ListMonthYearRequestDto;
    }
    
    interface IFinancialEngageableUpsertRequestDto {
        statsDateTime: string | null;
        note: string | null;
        updatedReason: string | null;
    }
}

export { };