declare global {
    interface SupplyBasicResponseDto {
        id: number;
        statsDateTime: string;
        amount: number;
        isLocked: boolean;
        createdUser: UserBasicResponseDto;
        thumbnailUrl: string | null;
        authorization: SupplyAuthorizationResponseDto | null;
    }
    
    interface SupplyListResponseDto {
        pageCount: number;
        items: SupplyBasicResponseDto[] | null;
        monthYearOptions: MonthYearResponseDto[] | null;
        authorization: SupplyListAuthorizationResponseDto;
    }
    
    interface SupplyDetailResponseDto {
        id: number;
        statsDateTime: string;
        shipmentFee: number;
        note: string | null;
        createdDateTime: string;
        createdUser: UserBasicResponseDto;
        isLocked: boolean;
        items: SupplyItemResponseDto[] | null;
        photos: SupplyPhotoResponseDto[] | null;
        authorization: SupplyAuthorizationResponseDto;
        updateHistories: SupplyUpdateHistoryResponseDto[] | null;
    }
    
    interface SupplyListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface SupplyAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };