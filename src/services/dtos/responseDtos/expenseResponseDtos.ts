import type { ExpenseCategory } from "../enums";

declare global {
    class ExpenseBasicResponseDto
            implements
                IHasStatsBasic<
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
            implements IHasStatsList<
                ExpenseBasicResponseDto,
                ExpenseExistingAuthorizationResponseDto> {
        pageCount: number;
        items: ExpenseBasicResponseDto[];
        monthYearOptions: ListMonthYearResponseDto[];;
    }
    
    class ExpenseDetailResponseDto
            implements
                IHasStatsDetail<
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
        createdUser: ResponseDtos.User.Basic;
        payee: ExpensePayeeResponseDto;
        photos: ExpensePhotoResponseDto[] | null;
        authorization: ExpenseExistingAuthorizationResponseDto;
        updateHistories: ExpenseUpdateHistoryResponseDto[] | null;
    }
    
    class ExpenseCreatingAuthorizationResponseDto
            implements IHasStatsCreatingAuthorization {
        canSetStatsDateTime: boolean;
    }
    
    class ExpenseExistingAuthorizationResponseDto
            implements IHasStatsExistingAuthorization {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };