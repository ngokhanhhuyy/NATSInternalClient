import type { TreatmentItemRequestDto } from "./treatmentItemRequestDtos";
import type { TreatmentPhotoRequestDto } from "./treatmentPhotoRequestDtos";

export interface TreatmentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    page: number;
    resultsPerPage: number;
}

export interface TreatmentUpsertRequestDto {
    paidDateTime: string | null;
    serviceAmount: number;
    serviceVatFactor: number;
    note: string | null;
    customerId: number;
    therapistId: number;
    updateReason: string | null;
    items: TreatmentItemRequestDto[];
    photos: TreatmentPhotoRequestDto[];
}