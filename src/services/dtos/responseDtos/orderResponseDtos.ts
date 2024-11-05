declare global {
   class OrderBasicResponseDto
            implements
                IProductExportableBasicResponseDto<OrderExistingAuthorizationResponseDto>,
                IHasThumbnailBasicResponseDto {
        amount: number;
        id: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: ResponseDtos.Customer.Basic;
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
        customer: ResponseDtos.Customer.Basic;
        createdUser: ResponseDtos.User.Basic;
        photos: OrderPhotoResponseDto[] | null;
        authorization: OrderExistingAuthorizationResponseDto;
        updateHistories: OrderUpdateHistoryResponseDto[] | null;
    }
    
   class OrderCreatingAuthorizationResponseDto
            implements IHasStatsCreatingAuthorization {
        canSetStatsDateTime: boolean;
    }
    
   class OrderExistingAuthorizationResponseDto
            implements IHasStatsExistingAuthorization {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };