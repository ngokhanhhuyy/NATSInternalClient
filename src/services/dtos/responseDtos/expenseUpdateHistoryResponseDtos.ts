import type { ExpenseCategory } from "../enums";

declare global {
    class ExpenseUpdateHistoryResponseDto implements IUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
        oldStatsDateTime: string;
        oldAmount: number;
        oldCategory: ExpenseCategory;
        oldNote: string | null;
        oldPayeeName: string;
        newStatsDateTime: string;
        newAmount: number;
        newCategory: ExpenseCategory;
        newNote: string | null;
        newPayeeName: string;
    }
}

export { };