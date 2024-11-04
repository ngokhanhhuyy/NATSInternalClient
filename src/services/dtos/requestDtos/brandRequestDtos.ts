declare global {
    type BrandListRequestDto = InstanceType<typeof ListRequestDto>;
    type BrandUpsertRequestDto = typeof UpsertRequestDto;
}

declare class ListRequestDto implements ISortableListRequestDto {
    sortByAscending?: boolean;
    sortByField?: string;
    page?: number;
    resultsPerPage?: number;
}

declare class UpsertRequestDto implements IHasThumbnailUpsertRequestDto {
    name: string;
    website: string | null;
    socialMediaUrl: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    countryId: number | null;
}

export { };