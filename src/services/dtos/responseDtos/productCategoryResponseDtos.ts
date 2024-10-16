export interface ProductCategoryResponseDto {
    id: number;
    name: string;
    authorization: ProductCategoryListAuthorizationResponseDto | null;
};

export interface ProductCategoryListResponseDto {
    items: ProductCategoryResponseDto[] | null;
    authorization: ProductCategoryAuthorizationResponseDto;
}

export interface ProductCategoryListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ProductCategoryAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}