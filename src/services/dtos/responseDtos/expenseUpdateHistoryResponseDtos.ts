import type { ExpenseCategory } from "../enums";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface ExpenseUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldAmount: number;
    oldCategory: ExpenseCategory;
    oldNote: string | null;
    oldPayeeName: string;
    newPaidDateTime: DateTimeISOString;
    newAmount: number;
    newCategory: ExpenseCategory;
    newNote: string | null;
    newPayeeName: string;
}