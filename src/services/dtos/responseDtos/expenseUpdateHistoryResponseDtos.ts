import type { ExpenseCategory } from "../enums";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface ExpenseUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: string;
    oldAmount: number;
    oldCategory: ExpenseCategory;
    oldNote: string | null;
    oldPayeeName: string;
    newPaidDateTime: string;
    newAmount: number;
    newCategory: ExpenseCategory;
    newNote: string | null;
    newPayeeName: string;
}