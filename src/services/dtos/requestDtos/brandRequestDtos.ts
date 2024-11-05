declare global {
    type BrandListRequestDto = InstanceType<typeof RequestDtos.Brand.List>;
    type BrandUpsertRequestDto = InstanceType<typeof RequestDtos.Brand.Upsert>;

    namespace RequestDtos {
        namespace Brand {
            class List implements ISortableListRequestDto {
                sortByAscending?: boolean;
                sortByField?: string;
                page?: number;
                resultsPerPage?: number;
            }
            
            class Upsert implements IHasThumbnailUpsertRequestDto {
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
        }
    }
}

export { };