declare global {
    class SupplyListRequestDto implements IProductEngageableListRequestDto {
        sortByAscending?: boolean;
        sortByField?: string;
        monthYear?: ListMonthYearRequestDto;
        createdUserId: number;
        productId?: number;
        page?: number;
        resultsPerPage?: number;
    }
    
    class SupplyUpsertRequestDto
            implements IProductEngageableUpsertRequestDto<
                SupplyUpsertItemRequestDto,
                SupplyUpsertPhotoRequestDto> {
        statsDateTime: string | null;
        shipmentFee: number;
        note: string | null;
        items: SupplyUpsertItemRequestDto[];
        photos: SupplyUpsertPhotoRequestDto[] | null;
        updatedReason: string | null;
    }
}

export { };