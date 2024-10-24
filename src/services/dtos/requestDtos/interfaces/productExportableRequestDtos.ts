declare global {
    interface IProductExportableListRequestDto
            extends IProductEngageableListRequestDto, ICustomerEngageableListRequestDto { }

    interface IProductExportableUpsertRequestDto
            extends IProductEngageableUpsertRequestDto, ICustomerEngageableUpsertRequestDto { }

    interface IProductExportableUpsertItemRequestDto
            extends IProductEngageableUpsertItemRequestDto {
        vatAmountPerUnit: number;
    }
}

export { };