declare global {
    interface TreatmentBasicResponseDto {
        id: number;
        statsDateTime: string;
        amount: number;
        isLocked: boolean;
        customer: CustomerBasicResponseDto;
        authorization: TreatmentAuthorizationResponseDto | null;
    }
    
    interface TreatmentListResponseDto {
        pageCount: number;
        items: TreatmentBasicResponseDto[] | null;
        monthYearOptions: MonthYearResponseDto[] | null;
        authorization: TreatmentListAuthorizationResponseDto | null;
    }
    
    interface TreatmentDetailResponseDto {
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
        authorization: TreatmentAuthorizationResponseDto;
        updateHistories: TreatmentUpdateHistoryResponseDto[] | null;
    }
    
    interface TreatmentListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface TreatmentAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
        canSetStatsDateTime: boolean;
    }
}

export { };