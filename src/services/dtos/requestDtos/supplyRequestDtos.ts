declare global {
    type SupplyListRequestDto = InstanceType<typeof RequestDtos.Supply.List>;
    type SupplyUpsertRequestDto = InstanceType<typeof RequestDtos.Supply.Upsert>;

    namespace RequestDtos {
        namespace Supply {
            class List implements IProductEngageableListRequestDto {
                sortByAscending?: boolean;
                sortByField?: string;
                monthYear?: ListMonthYearRequestDto;
                createdUserId: number;
                productId?: number;
                page?: number;
                resultsPerPage?: number;
            }
            
            class Upsert
                    implements IProductEngageableUpsertRequestDto<UpsertItem, UpsertPhoto> {
                statsDateTime: string | null;
                shipmentFee: number;
                note: string | null;
                items: UpsertItem[];
                photos: UpsertPhoto[] | null;
                updatedReason: string | null;
            }
        }
    }
}

export { };