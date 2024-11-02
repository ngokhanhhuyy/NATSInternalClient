import type { ExpenseCategory } from "../enums";

declare global {
    interface ExpenseBasicResponseDto {
        id: number;
        amount: number;
        statsDateTime: string;
        category: ExpenseCategory;
        isLocked: boolean;
        thumbnailUrl: string | null;
        authorization: ExpenseAuthorizationResponseDto | null;
    }
    
    interface ExpenseListResponseDto {
        pageCount: number;
        items: ExpenseBasicResponseDto[] | null;
        monthYearOptions: MonthYearResponseDto[];
        authorization: ExpenseListAuthorizationResponseDto | null;
    }
    
    interface ExpenseDetailResponseDto {
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
        authorization: ExpenseAuthorizationResponseDto;
        updateHistories: ExpenseUpdateHistoryResponseDto[] | null;
    }
    
    interface ExpenseListAuthorizationResponseDto
            extends IUpsertableListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface ExpenseAuthorizationResponseDto
            extends IFinancialEngageableAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };