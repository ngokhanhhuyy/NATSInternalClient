declare global {
    type TreatmentItemResponseDto = InstanceType<typeof ResponseDtos.Treatment.Item>;

    namespace ResponseDtos {
        namespace Treatment {
            class Item implements IHasProductDetailItem {
                id: number;
                productAmountPerUnit: number;
                vatAmountPerUnit: number;
                quantity: number;
                product: ProductBasicResponseDto;
            }
        }
    }
}

export { };