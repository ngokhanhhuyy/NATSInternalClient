declare global {
    class DebtIncurrenceBasicResponseDto
            implements IDebtBasicResponseDto<DebtIncurrenceExistingAuthorizationResponseDto> {
        id: number;
        amount: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: DebtIncurrenceExistingAuthorizationResponseDto | null;
    }
    
    class DebtIncurrenceListResponseDto
            implements IDebtListResponseDto<
                DebtIncurrenceBasicResponseDto,
                DebtIncurrenceExistingAuthorizationResponseDto> {
        pageCount: number;
        items: DebtIncurrenceBasicResponseDto[];
    }
    
    class DebtIncurrenceDetailResponseDto
            implements IDebtDetailResponseDto<
                DebtIncurrenceUpdateHistoryResponseDto,
                DebtIncurrenceExistingAuthorizationResponseDto> {
        id: number;
        amount: number;
        note: string;
        statsDateTime: string;
        createdDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        authorization: DebtIncurrenceExistingAuthorizationResponseDto;
        updateHistories: DebtIncurrenceUpdateHistoryResponseDto[] | null;
    }
    
    class DebtIncurrenceCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    class DebtIncurrenceExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };