declare global {
    namespace RequestDtos {
        namespace Brand {
            type List = PartialImplements<ISortablePaginatedList, {
                sortingByAscending: boolean;
                sortingByField: string;
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = Implements<IHasThumbnailUpsert, {
                name: string;
                website: string | null;
                socialMediaUrl: string | null;
                phoneNumber: string | null;
                email: string | null;
                address: string | null;
                thumbnailFile: string | null;
                thumbnailChanged: boolean;
                countryId: number | null;
            }>;
        }
    }
}

export { };