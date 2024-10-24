declare global {
    interface TreatmentListRequestDto {
        orderByAscending: boolean;
        orderByField: string;
        month: number | null;
        year: number | null;
        ignoreMonthYear: boolean;
        createdUserId: number | null;
        customerId: number | null;
        productId: number | null;
        page: number;
        resultsPerPage: number;
    }
    
    interface TreatmentUpsertRequestDto {
        statsDateTime: string | null;
        serviceAmountBeforeVat: number;
        serviceVatFactor: number;
        note: string | null;
        customerId: number | null;
        therapistId: number | null;
        items: TreatmentItemRequestDto[];
        photos: TreatmentUpsertPhotoRequestDto[] | null;
        updatedReason: string | null;
    } 
}

export { };