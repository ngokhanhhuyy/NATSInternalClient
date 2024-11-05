declare global {
    namespace ResponseDtos {
        namespace ProductCategory {
            type Basic = Implements<IUpsertableBasic<ExistingAuthorization>, {
                id: number;
                name: string;
                authorization: ExistingAuthorization | null;
            }>;

            type Detail = Basic;
            
            type List = Implements<IUpsertableList<Basic, ExistingAuthorization>, {
                pageCount: number;
                items: Basic[];
            }>;
            
            type ExistingAuthorization = Implements<IUpsertableExistingAuthorization, {
                canEdit: boolean;
                canDelete: boolean;
            }>;
        }
    }
}

export { };