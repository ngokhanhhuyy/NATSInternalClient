import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { TreatmentItemResponseDto } from "./treatmentItemResponseDtos";
import type { TreatmentPhotoResponseDto } from "./treatmentPhotoResponseDtos";
import type { TreatmentUpdateHistoryResponseDto } from "./treatmentUpdateHistoryResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface TreatmentBasicResponseDto {
    id: number;
    paidDateTime: string;
    amount: number;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: TreatmentAuthorizationResponseDto | null;
}

export interface TreatmentListResponseDto {
    pageCount: number;
    items: TreatmentBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[] | null;
    authorization: TreatmentListAuthorizationResponseDto | null;
}

export interface TreatmentDetailResponseDto {
    id: number;
    paidDateTime: string;
    createdDateTime: string;
    lastUpdatedDateTime: string | null;
    serviceAmount: number;
    serviceVatAmount: number;
    serviceVatFactor: number;
    productAmount: number;
    totalAmountAfterVAT: number;
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

export interface TreatmentListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface TreatmentAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetPaidDateTime: boolean;
}