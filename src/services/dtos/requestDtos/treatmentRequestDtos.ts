import type { TreatmentItemRequestDto } from "./treatmentItemRequestDtos";
import type { TreatmentUpsertPhotoRequestDto } from "./treatmentPhotoRequestDtos";

export interface TreatmentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
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
    photos: TreatmentUpsertPhotoRequestDto[] | null;
    updatedReason: string | null;
} 