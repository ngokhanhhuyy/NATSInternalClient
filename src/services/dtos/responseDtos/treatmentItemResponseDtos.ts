declare global {
    namespace ResponseDtos {
        namespace Treatment {
            type Item = Implements<IHasProductDetailItem, {
                id: number;
                productAmountPerUnit: number;
                vatAmountPerUnit: number;
                quantity: number;
                product: ProductBasicResponseDto;
            }>;
        }
    }
}

export { };