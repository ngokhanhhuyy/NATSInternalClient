declare global {
    namespace ResponseDtos {
        namespace Brand {
            type List = Implements<IUpsertableList<Basic, ExistingAuthorization>, {
                pageCount: number;
                items: Basic[];
            }>;
            
            type Basic = Implements<IUpsertableBasic<ExistingAuthorization>, {
                id: number;
                name: string;
                thumbnailUrl: string | null;
                authorization: ExistingAuthorization;
            }>;
            
            type Detail = Implements<IUpsertableDetail<ExistingAuthorization>, {
                id: number;
                name: string;
                website: string | null;
                socialMediaUrl: string | null;
                phoneNumber: string | null;
                email: string | null;
                address: string | null;
                createdDateTime: string;
                thumbnailUrl: string | null;
                country: ResponseDtos.Country | null;
                authorization: ExistingAuthorization;
            }>;
            
            type ExistingAuthorization = Implements<IUpsertableExistingAuthorization, {
                canEdit: boolean;
                canDelete: boolean;
            }>;
        }
    }
}

export { };