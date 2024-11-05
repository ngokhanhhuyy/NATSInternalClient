declare global {
    namespace RequestDtos {
        namespace Treatment {
            type List = PartialImplements<IHasProductList, {
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
                serviceAmountBeforeVat: number;
                serviceVatFactor: number;
                note: string | null;
                customerId: number | null;
                therapistId: number | null;
                items: UpsertItem[];
                photos: UpsertPhoto[] | null;
                updatedReason: string | null;
            }>;
        }
    }
}

export { };