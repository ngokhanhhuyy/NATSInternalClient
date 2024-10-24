declare global {
    interface DebtPaymentBasicResponseDto {
        id: number;
        amount: number;
        statsDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: DebtPaymentAuthorizationResponseDto | null;
    }
    
    interface DebtPaymentListResponseDto {
        pageCount: number;
        items: DebtPaymentBasicResponseDto[] | null;
        monthYearOptions: MonthYearResponseDto[];
        authorization: DebtPaymentListAuthorizationResponseDto;
    }
    
    interface DebtPaymentDetailResponseDto {
        id: number;
        amount: number;
        note: string | null;
        statsDateTime: string;
        createdDateTime: string;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        authorization: DebtPaymentAuthorizationResponseDto;
        updateHistories: DebtPaymentUpdateHistoryResponseDto[] | null;
    }
    
    interface DebtPaymentListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface DebtPaymentAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };