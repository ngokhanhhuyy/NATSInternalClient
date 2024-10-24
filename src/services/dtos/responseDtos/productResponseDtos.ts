declare global {
    interface ProductBasicResponseDto {
        id: number;
        name: string;
        unit: string;
        defaultPrice: number;
        defaultVatPercentage: number;
        stockingQuantity: number;
        thumbnailUrl: string | null;
        authorization: ProductAuthorizationResponseDto | null;
    }
    
    interface ProductListResponseDto {
        pageCount: number;
        items: ProductBasicResponseDto[] | null;
        authorization: ProductListAuthorizationResponseDto;
    }
    
    interface ProductDetailResponseDto {
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
        authorization: ProductAuthorizationResponseDto;
    }
    
    interface ProductListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface ProductAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };