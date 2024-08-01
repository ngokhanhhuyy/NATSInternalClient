import type { TreatmentItemRequestDto } from "./treatmentItemRequestDtos";
import type { TreatmentPhotoRequestDto } from "./treatmentPhotoRequestDtos";

export interface TreatmentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    page: number;
    resultsPerPage: number;
}

export interface TreatmentUpsertRequestDto {
    paidDateTime: DateTimeISOString | null;
    serviceAmount: number;
    serviceVatFactor: number;
    note: string | null;
    customerId: number | null;
    therapistId: number | null;
    updateReason: string | null;
    items: TreatmentItemRequestDto[];
    photos: TreatmentPhotoRequestDto[] | null;
}