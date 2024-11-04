declare global {
    class DebtPaymentBasicResponseDto
            implements IDebtBasicResponseDto<DebtPaymentExistingAuthorizationResponseDto> {
        id: number;
        amount: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: DebtPaymentExistingAuthorizationResponseDto | null;
    }
    
    class DebtPaymentListResponseDto implements IDebtListResponseDto<
            DebtPaymentBasicResponseDto,
            DebtPaymentExistingAuthorizationResponseDto> {
        pageCount: number;
        items: DebtPaymentBasicResponseDto[];
    }
    
    class DebtPaymentDetailResponseDto
            implements IDebtDetailResponseDto<
                DebtPaymentUpdateHistoryResponseDto,
                DebtPaymentExistingAuthorizationResponseDto> {
        id: number;
        amount: number;
        note: string | null;
        statsDateTime: string;
        createdDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        authorization: DebtPaymentExistingAuthorizationResponseDto;
        updateHistories: DebtPaymentUpdateHistoryResponseDto[] | null;
    }
    
    class DebtPaymentCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    class DebtPaymentExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };