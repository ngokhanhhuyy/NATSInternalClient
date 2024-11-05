declare global {
    type SupplyUpsertItemRequestDto = InstanceType<typeof RequestDtos.Supply.UpsertItem>;

    namespace RequestDtos {
        namespace Supply {
            class UpsertItem implements IProductEngageableUpsertItemRequestDto {
                id: number | null;
                productAmountPerUnit: number;
                quantity: number;
                productId: number;
                hasBeenChanged: boolean;
                hasBeenDeleted: boolean;
            }
        }
    }
}

export { };