declare global {
    namespace RequestDtos {
        namespace Order {
            type List = PartialImplements<IExportProductList, {
                sortByAscending: boolean;
                sortByField: string;
                monthYear: ListMonthYear;
                createdUserId: number;
                customerId: number;
                productId: number;
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = Implements<IExportProductUpsert<UpsertItem, UpsertPhoto>, {
                statsDateTime: string | null;
                note: string | null;
                customerId: number;
                items: UpsertItem[];
                photos: UpsertPhoto[];
                updatedReason: string | null;
            }>;
        }
    }
}

export { };