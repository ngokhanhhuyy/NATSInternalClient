declare global {
    interface ConsultantBasicResponseDto {
        id: number;
        amountAfterVat: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: ConsultantAuthorizationResponseDto | null;
    }
    
    interface ConsultantListResponseDto {
        pageCount: number;
        items: ConsultantBasicResponseDto[] | null;
    }
    
    interface ConsultantDetailResponseDto {
        id: number;
        amountBeforeVat: number;
        vatAmount: number;
        note: string | null;
        statsDateTime: string;
        createdDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        authorization: ConsultantAuthorizationResponseDto;
        updateHistories: ConsultantUpdateHistoryResponseDto[] | null;
    }
    
    interface ConsultantCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    interface ConsultantAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };
