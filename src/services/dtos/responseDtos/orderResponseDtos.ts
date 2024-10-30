declare global {
    interface OrderBasicResponseDto {
        id: number;
        statsDateTime: string;
        amountAfterVat: number;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: OrderAuthorizationResponseDto | null;
    }
    
    interface OrderListResponseDto {
        pageCount: number;
        items: OrderBasicResponseDto[] | null;
        monthYearOptions: MonthYearResponseDto[] | null;
        authorization: OrderListAuthorizationResponseDto | null;
    }
    
    interface OrderDetailResponseDto {
        id: number;
        statsDateTime: string;
        createdDateTime: string;
        amountBeforeVat: number;
        vatAmount: number;
        note: string;
        isLocked: boolean;
        items: OrderItemResponseDto[] | null;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        photos: OrderPhotoResponseDto[] | null;
        authorization: OrderAuthorizationResponseDto;
        updateHistories: OrderUpdateHistoryResponseDto[] | null;
    }
    
    interface OrderListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface OrderAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };