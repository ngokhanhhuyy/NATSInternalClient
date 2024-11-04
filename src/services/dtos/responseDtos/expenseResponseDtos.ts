import type { ExpenseCategory } from "../enums";

declare global {
    class ExpenseBasicResponseDto
            implements
                IFinancialEngageableBasicResponseDto<
                    ExpenseExistingAuthorizationResponseDto>,
                IHasThumbnailBasicResponseDto {
        id: number;
        amount: number;
        statsDateTime: string;
        category: ExpenseCategory;
        isLocked: boolean;
        thumbnailUrl: string | null;
        authorization: ExpenseExistingAuthorizationResponseDto | null;
    }
    
    class ExpenseListResponseDto
            implements IFinancialEngageableListResponseDto<
                ExpenseBasicResponseDto,
                ExpenseExistingAuthorizationResponseDto> {
        pageCount: number;
        items: ExpenseBasicResponseDto[];
        monthYearOptions: ListMonthYearResponseDto[];;
    }
    
    class ExpenseDetailResponseDto
            implements
                IFinancialEngageableDetailResponseDto<
                    ExpenseUpdateHistoryResponseDto,
                    ExpenseExistingAuthorizationResponseDto>,
                IHasMultiplePhotoDetailModel<ExpensePhotoResponseDto> {
        id: number;
        amountAfterVat: number;
        statsDateTime: string;
        createdDateTime: string;
        category: ExpenseCategory;
        note: string;
        isLocked: boolean;
        createdUser: UserBasicResponseDto;
        payee: ExpensePayeeResponseDto;
        photos: ExpensePhotoResponseDto[] | null;
        authorization: ExpenseExistingAuthorizationResponseDto;
        updateHistories: ExpenseUpdateHistoryResponseDto[] | null;
    }
    
    class ExpenseCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    class ExpenseExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };