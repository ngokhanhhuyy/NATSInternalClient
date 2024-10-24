declare global {
    interface ProductCategoryResponseDto {
        id: number;
        name: string;
        authorization: ProductCategoryAuthorizationResponseDto | null;
    }
    
    interface ProductCategoryListResponseDto {
        pageCount: number;
        items: ProductCategoryResponseDto[] | null;
        authorization: ProductCategoryListAuthorizationResponseDto | null;
    }
    
    interface ProductCategoryListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface ProductCategoryAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };