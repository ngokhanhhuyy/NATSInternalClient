declare global {
    interface IProductEngageableListRequestDto extends IFinancialEngageableListRequestDto {
        productId?: number;
    }
    
    interface IProductEngageableUpsertRequestDto<
                TItem extends IProductEngageableUpsertItemRequestDto,
                TPhoto extends IUpsertPhotoRequestDto>
            extends
                IFinancialEngageableUpsertRequestDto,
                IHasMultiplePhotosUpsertRequestDto<TPhoto> {
        items: TItem[];
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