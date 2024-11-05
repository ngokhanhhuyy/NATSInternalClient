declare global {
    type TreatmentBasicResponseDto = InstanceType<typeof ResponseDtos.Treatment.Basic>;
    type TreatmentListResponseDto = InstanceType<typeof ResponseDtos.Treatment.List>;
    type TreatmentDetailResponseDto = InstanceType<typeof ResponseDtos.Treatment.Detail>;
    type TreatmentCreatingAuthorizationResponseDto = InstanceType<typeof ResponseDtos.Treatment.CreatingAuthorization>;
    type TreatmentExistingAuthorizationResponseDto = InstanceType<typeof ResponseDtos.Treatment.ExistingAuthorization>;

    namespace ResponseDtos {
        namespace Treatment {
            class Basic implements
                    IExportProductBasic<
                        ExistingAuthorization> {
                id: number;
                statsDateTime: string;
                amount: number;
                isLocked: boolean;
                customer: ResponseDtos.Customer.Basic;
                authorization: ExistingAuthorization | null;
            }
            
            class List
                    implements IExportProductList<
                        Basic,
                        ExistingAuthorization> {
                pageCount: number;
                items: Basic[];
            }
            
            class Detail
                    implements IExportProductDetail<
                        TreatmentItemResponseDto,
                        TreatmentPhotoResponseDto,
                        TreatmentUpdateHistoryResponseDto,
                        TreatmentItemUpdateHistoryDataDto,
                        ExistingAuthorization> {
                id: number;
                statsDateTime: string;
                createdDateTime: string;
                serviceAmountBeforeVat: number;
                serviceVatAmount: number;
                note: string | null;
                isLocked: boolean;
                customer: ResponseDtos.Customer.Basic;
                createdUser: UserBasicResponseDto;
                therapist: UserBasicResponseDto;
                items: TreatmentItemResponseDto[];
                photos: TreatmentPhotoResponseDto[];
                authorization: ExistingAuthorization;
                updateHistories: TreatmentUpdateHistoryResponseDto[] | null;
            }
            
            class CreatingAuthorization
                    implements IFinancialEngageableCreatingAuthorizationModel {
                canSetStatsDateTime: boolean;
            }
            
            class ExistingAuthorization
                    implements IHasStatsExistingAuthorization {
                canEdit: boolean;
                canDelete: boolean;
                canSetStatsDateTime: boolean;
            }
        }
    }
}

export { };