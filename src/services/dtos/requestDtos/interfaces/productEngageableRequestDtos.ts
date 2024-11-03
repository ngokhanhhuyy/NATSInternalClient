declare global {
    interface IProductEngageableListRequestDto extends IFinancialEngageableListRequestDto {
        productId?: number;
    }
    
    interface IProductEngageableUpsertRequestDto
            extends IFinancialEngageableUpsertRequestDto {
        items: IProductEngageableUpsertItemRequestDto[];
        photos: IPhotoUpsertRequestDto[] | null;
    }
    
    interface IProductEngageableUpsertItemRequestDto {
        id: number | null;
        productAmountPerUnit: number;
        quantity: number;
        productId: number;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };