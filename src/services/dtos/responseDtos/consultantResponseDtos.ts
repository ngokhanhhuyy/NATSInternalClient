declare global {
    class ConsultantBasicResponseDto
            implements ICustomerEngageableBasicResponseDto<
                ConsultantExistingAuthorizationResponseDto> {
        id: number;
        amount: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: ConsultantExistingAuthorizationResponseDto | null;
    }
    
    class ConsultantListResponseDto implements
            ICustomerEngageableListResponseDto<
                ConsultantBasicResponseDto,
                ConsultantExistingAuthorizationResponseDto> {
        pageCount: number;
        items: ConsultantBasicResponseDto[];
    }
    
    class ConsultantDetailResponseDto
            implements ICustomerEngageableDetailResponseDto<
                ConsultantUpdateHistoryResponseDto,
                ConsultantExistingAuthorizationResponseDto> {
        customer: CustomerBasicResponseDto;
        amount: number;
        isLocked: boolean;
        updateHistories: ConsultantUpdateHistoryResponseDto[] | null;
        createdUser: UserBasicResponseDto;
        createdDateTime: string;
        authorization: ConsultantExistingAuthorizationResponseDto | null;
        id: number;
    }
    
    class ConsultantCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    class ConsultantExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };
