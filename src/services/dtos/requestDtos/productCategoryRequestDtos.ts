declare global {
    class ProductCategoryListRequestDto implements IListRequestDto {
        page: number;
        resultsPerPage: number;
    }
    
    class ProductCategoryUpsertRequestDto
            implements IHasMultiplePhotosUpsertRequestDto<ProductUpsertPhotoRequestDto> {
        photos: ProductUpsertPhotoRequestDto[] | null;
        name: string;
    }
}

export { };