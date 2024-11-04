declare global {
    class TreatmentListRequestDto implements IProductExportableListRequestDto {
        sortByAscending: boolean;
        sortByField: string;
        monthYear?: ListMonthYearRequestDto;
        createdUserId?: number;
        customerId?: number;
        productId?: number;
        page?: number;
        resultsPerPage?: number;
    }
    
    class TreatmentUpsertRequestDto
            implements IProductExportableUpsertRequestDto<
                TreatmentUpsertItemRequestDto,
                TreatmentUpsertPhotoRequestDto> {
        statsDateTime: string | null;
        serviceAmountBeforeVat: number;
        serviceVatFactor: number;
        note: string | null;
        customerId: number | null;
        therapistId: number | null;
        items: TreatmentUpsertItemRequestDto[];
        photos: TreatmentUpsertPhotoRequestDto[] | null;
        updatedReason: string | null;
    } 
}

export { };