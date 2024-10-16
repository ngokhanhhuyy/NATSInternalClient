import type { TreatmentItemRequestDto } from "./treatmentItemRequestDtos";
import type { TreatmentPhotoRequestDto } from "./treatmentPhotoRequestDtos";

export interface TreatmentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number;
    year: number;
    ignoreMonthYear: boolean;
    createdUserId: number | null;
    customerId: number | null;
    productId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface TreatmentUpsertRequestDto {
    statsDateTime: string | null;
    serviceAmountBeforeVat: number;
    serviceVatFactor: number;
    note: string | null;
    customerId: number | null;
    therapistId: number | null;
    items: TreatmentItemRequestDto[];
    photos: TreatmentPhotoRequestDto[] | null;
    updatedReason: string | null;
} 