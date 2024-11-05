declare global {
    namespace ResponseDtos {
        namespace Product {
            type Basic = Implements<
                    IUpsertableBasic<ExistingAuthorization> & IHasThumbnailBasic, {
                id: number;
                name: string;
                unit: string;
                defaultPrice: number;
                defaultVatPercentage: number;
                stockingQuantity: number;
                thumbnailUrl: string | null;
                authorization: ExistingAuthorization | null;
            }>;
            
            type List = Implements<
                    IUpsertableList<Basic, ExistingAuthorization>, {
                pageCount: number;
                items: Basic[];
            }>;
            
            type Detail = Implements<
                    IUpsertableDetail<ExistingAuthorization> &
                    IHasMultiplePhotosDetail<DetailPhoto>, {
                id: number;
                name: string;
                description: string | null;
                unit: string;
                defaultPrice: number;
                defaultVatPercentage: number;
                stockingQuantity: number;
                isForRetail: boolean;
                isDiscontinued: boolean;
                createdDateTime: string;
                updatedDateTime: string | null;
                thumbnailUrl: string | null;
                category: ResponseDtos.ProductCategory.Basic | null;
                brand: ResponseDtos.Brand.Basic | null;
                photos: DetailPhoto[] | null;
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