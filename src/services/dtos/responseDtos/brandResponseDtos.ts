declare global {
    interface BrandListResponseDto {
        pageCount: number;
        items: BrandBasicResponseDto[] | null;
    }
    
    interface BrandBasicResponseDto {
        id: number;
        name: string;
        thumbnailUrl: string | null;
        authorization: BrandExistingAuthorizationResponseDto;
    }
    
    interface BrandDetailResponseDto {
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
    
    interface BrandExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };