declare global {
    namespace RequestDtos {
        namespace DebtIncurrence {
            type List = Implements<IDebtList, {
                sortingByAscending: boolean;
                sortingByField: string;
                monthYear: ListMonthYear
                customerId: number;
                createdUserId: number;
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = Implements<IDebtUpsert, {
                amount: number;
                note: string | null;
                statsDateTime: string | null;
                customerId: number | null;
                updatedReason: string | null;
            }>;
        }
    }
}

export { };