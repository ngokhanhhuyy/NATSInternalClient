declare global {
    interface OrderItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto
    }
}

export { };