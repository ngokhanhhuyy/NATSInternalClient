declare global {
    interface BrandListRequestDto {
        orderByAscending: boolean;
        orderByField: string;
        page: number;
        resultsPerPage: number;
    }
    
    interface BrandUpsertRequestDto {
        name: string;
        website: string | null;
        socialMediaUrl: string | null;
        phoneNumber: string | null;
        email: string | null;
        address: string | null;
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
        countryId: number | null
    }
}

export { };