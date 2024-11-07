import type { ExpenseCategory } from "../enums";

declare global {
    namespace RequestDtos {
        namespace Expense {
            type List = PartialImplements<IHasStatsList, {
                sortByAscending: boolean;
                sortByField: string;
                monthYear: ListMonthYear;
                category: ExpenseCategory;
                createdUserId: number;
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = Implements<IHasStatsUpsert, {
                amount: number;
                statsDateTime: string | null;
                category: ExpenseCategory;
                note: string | null;
                payeeName: string;
                photos: Photo[] | null;
                updatedReason: string | null;
            }>;
        }
    }
}

export { };