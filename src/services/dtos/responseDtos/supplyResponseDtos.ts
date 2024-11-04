declare global {
    class SupplyBasicResponseDto
            implements
                IFinancialEngageableBasicResponseDto<
                    SupplyExistingAuthorizationResponseDto>,
                IHasThumbnailBasicResponseDto {
        id: number;
        statsDateTime: string;
        amount: number;
        isLocked: boolean;
        createdUser: UserBasicResponseDto;
        thumbnailUrl: string | null;
        authorization: SupplyExistingAuthorizationResponseDto | null;
    }
    
    class SupplyListResponseDto
            implements IFinancialEngageableListResponseDto<
                SupplyBasicResponseDto,
                SupplyExistingAuthorizationResponseDto> {
        pageCount: number;
        items: SupplyBasicResponseDto[];
    }
    
    class SupplyDetailResponseDto implements
            IProductEngageableDetailResponseDto<
                SupplyItemResponseDto,
                SupplyPhotoResponseDto,
                SupplyUpdateHistoryResponseDto,
                SupplyItemUpdateHistoryDataDto,
                SupplyExistingAuthorizationResponseDto> {
        id: number;
        statsDateTime: string;
        shipmentFee: number;
        note: string | null;
        createdDateTime: string;
        createdUser: UserBasicResponseDto;
        isLocked: boolean;
        items: SupplyItemResponseDto[];
        photos: SupplyPhotoResponseDto[] | null;
        authorization: SupplyExistingAuthorizationResponseDto;
        updateHistories: SupplyUpdateHistoryResponseDto[] | null;
    }
    
    class SupplyCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    class SupplyExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };