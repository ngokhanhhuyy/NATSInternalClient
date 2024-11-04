declare global {
    class TreatmentBasicResponseDto implements
            IProductExportableBasicResponseDto<
                TreatmentExistingAuthorizationResponseDto> {
        id: number;
        statsDateTime: string;
        amount: number;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: TreatmentExistingAuthorizationResponseDto | null;
    }
    
    class TreatmentListResponseDto
            implements IProductExportableListResponseDto<
                TreatmentBasicResponseDto,
                TreatmentExistingAuthorizationResponseDto> {
        pageCount: number;
        items: TreatmentBasicResponseDto[];
    }
    
    class TreatmentDetailResponseDto
            implements IProductExportableDetailResponseDto<
                TreatmentItemResponseDto,
                TreatmentPhotoResponseDto,
                TreatmentUpdateHistoryResponseDto,
                TreatmentItemUpdateHistoryDataDto,
                TreatmentExistingAuthorizationResponseDto> {
        id: number;
        statsDateTime: string;
        createdDateTime: string;
        serviceAmountBeforeVat: number;
        serviceVatAmount: number;
        note: string | null;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        createdUser: UserBasicResponseDto;
        therapist: UserBasicResponseDto;
        items: TreatmentItemResponseDto[];
        photos: TreatmentPhotoResponseDto[];
        authorization: TreatmentExistingAuthorizationResponseDto;
        updateHistories: TreatmentUpdateHistoryResponseDto[] | null;
    }
    
    class TreatmentCreatingAuthorizationResponseDto
            implements IFinancialEngageableCreatingAuthorizationModel {
        canSetStatsDateTime: boolean;
    }
    
    class TreatmentExistingAuthorizationResponseDto
            implements IFinancialEngageableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };