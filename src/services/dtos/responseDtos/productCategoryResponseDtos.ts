export interface ProductCategoryResponseDto {
    id: number;
    name: string;
};

export interface ProductCategoryListResponseDto {
    items: ProductCategoryResponseDto[] | null;
    authorization: ProductCategoryAuthorizationResponseDto;
}

export interface ProductCategoryAuthorizationResponseDto {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
}