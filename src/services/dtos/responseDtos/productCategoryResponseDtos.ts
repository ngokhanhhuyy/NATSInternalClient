declare global {
    class ProductCategoryResponseDto implements IUpsertableBasicResponseDto<
            IUpsertableExistingAuthorizationResponseDto> {
        id: number;
        name: string;
        authorization: ProductCategoryExistingAuthorizationResponseDto | null;
    }
    
    class ProductCategoryListResponseDto
            implements IUpsertableListResponseDto<
                ProductCategoryResponseDto,
                ProductCategoryExistingAuthorizationResponseDto> {
        pageCount: number;
        items: ProductCategoryResponseDto[];
    }
    
    class ProductCategoryExistingAuthorizationResponseDto
            implements IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };