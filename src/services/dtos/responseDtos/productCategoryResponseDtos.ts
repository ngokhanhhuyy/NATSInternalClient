declare global {
    class ProductCategoryResponseDto implements ICanUpsertBasic<
            ICanUpsertExistingAuthorization> {
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
            implements ICanUpsertExistingAuthorization {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };