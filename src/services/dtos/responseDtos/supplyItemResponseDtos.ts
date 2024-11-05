declare global {
    namespace ResponseDtos {
        namespace Supply {
            type DetailItem = Implements<IHasProductDetailItem, {
                id: number;
                productAmountPerUnit: number;
                quantity: number;
                product: ResponseDtos.Product.Basic;
            }>;
        }
    }
}

export { };