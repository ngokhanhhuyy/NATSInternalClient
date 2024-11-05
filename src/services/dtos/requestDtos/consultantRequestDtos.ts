declare global {
    namespace RequestDtos {
        namespace Consultant {
            type List = PartialImplements<IHasCustomerList, {
                sortByAscending: boolean;
                sortByField: string;
                monthYear: ListMonthYear;
                customerId: number;
                createdUserId: number;
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = Implements<IHasCustomerUpsert, {
                amountBeforeVat: number;
                vatAmount: number;
                note: string | null;
                statsDateTime: string | null;
                customerId: number;
                updatedReason: string | null;
            }>;
        }
    }
}

export { };