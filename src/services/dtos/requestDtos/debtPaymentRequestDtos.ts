declare global {
    namespace RequestDtos {
        namespace DebtPayment {
            type List = PartialImplements<IDebtList, {
                sortByAscending: boolean;
                sortByField: string;
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
                customerId: number;
                updatedReason: string | null;
            }>;
        }
    }
}

export { };