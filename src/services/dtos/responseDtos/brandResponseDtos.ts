declare global {
    class BrandListResponseDto
            implements IUpsertableListResponseDto<
                BrandBasicResponseDto,
                BrandExistingAuthorizationResponseDto> {
        pageCount: number;
        items: BrandBasicResponseDto[];
    }
    
    class BrandBasicResponseDto
            implements IUpsertableBasicResponseDto<BrandExistingAuthorizationResponseDto> {
        id: number;
        name: string;
        thumbnailUrl: string | null;
        authorization: BrandExistingAuthorizationResponseDto;
    }
    
    class BrandDetailResponseDto
            implements IUpsertableDetailResponseDto<BrandExistingAuthorizationResponseDto> {
        id: number;
        name: string;
        website: string | null;
        socialMediaUrl: string | null;
        phoneNumber: string | null;
        email: string | null;
        address: string | null;
        createdDateTime: string;
        thumbnailUrl: string | null;
        country: CountryResponseDto | null;
        authorization: BrandExistingAuthorizationResponseDto;
    }
    
    class BrandExistingAuthorizationResponseDto
            implements IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };