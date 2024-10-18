export interface ProductCategoryResponseDto {
    id: number;
    name: string;
    authorization: ProductCategoryAuthorizationResponseDto | null;
};

export interface ProductCategoryListResponseDto {
    pageCount: number;
    items: ProductCategoryResponseDto[] | null;
    authorization: ProductCategoryListAuthorizationResponseDto | null;
}

export interface ProductCategoryListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ProductCategoryAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}