declare global {
    class ProductBasicResponseDto
            implements
                ICanUpsertBasic<ProductExistingAuthorizationResponseDto>,
                IHasThumbnailBasicResponseDto {
        id: number;
        name: string;
        unit: string;
        defaultPrice: number;
        defaultVatPercentage: number;
        stockingQuantity: number;
        thumbnailUrl: string | null;
        authorization: ProductExistingAuthorizationResponseDto | null;
    }
    
    class ProductListResponseDto
            implements IUpsertableListResponseDto<
                ProductBasicResponseDto,
                ProductExistingAuthorizationResponseDto> {
        pageCount: number;
        items: ProductBasicResponseDto[];
    }
    
    class ProductDetailResponseDto
            implements
                ICanUpsertDetail<ProductExistingAuthorizationResponseDto>,
                IHasMultiplePhotosDetailResponseDto<ProductPhotoResponseDto> {
        id: number;
        name: string;
        description: string | null;
        unit: string;
        defaultPrice: number;
        defaultVatPercentage: number;
        stockingQuantity: number;
        isForRetail: boolean;
        isDiscontinued: boolean;
        createdDateTime: string;
        updatedDateTime: string | null;
        thumbnailUrl: string | null;
        category: ProductCategoryResponseDto | null;
        brand: BrandBasicResponseDto | null;
        photos: ProductPhotoResponseDto[] | null;
        authorization: ProductExistingAuthorizationResponseDto;
    }
    
    class ProductExistingAuthorizationResponseDto
            implements ICanUpsertExistingAuthorization {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };