declare global {
   class OrderBasicResponseDto
            implements
                IProductExportableBasicResponseDto<OrderExistingAuthorizationResponseDto>,
                IHasThumbnailBasicResponseDto {
        amount: number;
        id: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        thumbnailUrl: string | null;
        authorization: OrderExistingAuthorizationResponseDto | null;
    }
    
    class OrderListResponseDto
            implements IProductExportableListResponseDto<
                OrderBasicResponseDto,
                OrderExistingAuthorizationResponseDto> {
        pageCount: number;
        items: OrderBasicResponseDto[];
    }
    
   class OrderDetailResponseDto
            implements
                IProductExportableDetailResponseDto<
                    OrderItemResponseDto,
                    OrderPhotoResponseDto,
                    OrderUpdateHistoryResponseDto,
                    OrderItemUpdateHistoryDataDto,
                    OrderExistingAuthorizationResponseDto>,
                IHasMultiplePhotosDetailResponseDto<OrderPhotoResponseDto> {
        id: number;
        statsDateTime: string;
        createdDateTime: string;
        amountBeforeVat: number;
        vatAmount: number;
        note: string;
        isLocked: boolean;
        items: OrderItemResponseDto[];
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        photos: OrderPhotoResponseDto[] | null;
        authorization: OrderExistingAuthorizationResponseDto;
        updateHistories: OrderUpdateHistoryResponseDto[] | null;
    }
    
   class OrderCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
   class OrderExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };