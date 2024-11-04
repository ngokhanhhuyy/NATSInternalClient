declare global {
    interface IProductExportableListRequestDto
            extends IProductEngageableListRequestDto, ICustomerEngageableListRequestDto { }

    interface IProductExportableUpsertRequestDto<
                TItem extends IProductExportableUpsertItemRequestDto,
                TPhoto extends IUpsertPhotoRequestDto>
            extends
                IProductEngageableUpsertRequestDto<TItem, TPhoto>,
                ICustomerEngageableUpsertRequestDto { }

    interface IProductExportableUpsertItemRequestDto
            extends IProductEngageableUpsertItemRequestDto {
        vatAmountPerUnit: number;
    }
}

export { };