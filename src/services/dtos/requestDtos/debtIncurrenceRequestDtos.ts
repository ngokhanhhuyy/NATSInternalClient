declare global {
    namespace RequestDtos {
        namespace DebtIncurrence {
            type List = PartialImplements<IDebtList, {
                sortingByAscending: boolean;
                sortingByField: string;
                monthYear: RequestDtos.List.MonthYear
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