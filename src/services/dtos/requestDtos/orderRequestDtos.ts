declare global {
    interface OrderListRequestDto {
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
    
    interface OrderUpsertRequestDto {
        statsDateTime: string | null;
        note: string | null;
        customerId: number;
        items: OrderUpsertItemRequestDto[];
        photos: OrderUpsertPhotoRequestDto[];
        updatedReason: string | null;
    }
}

export { };