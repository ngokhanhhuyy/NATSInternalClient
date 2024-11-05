import type { ExpenseCategory } from "../enums";

declare global {
    type ExpenseUpdateHistoryResponseDto = InstanceType<typeof ResponseDtos.Expense.UpdateHistory>;

    namespace ResponseDtos {
        namespace Expense {
            class UpdateHistory implements IUpdateHistory {
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
    }
}

export { };