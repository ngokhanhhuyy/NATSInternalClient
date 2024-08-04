import type { CustomerUpsertRequestDto } from "./customerRequestDtos";

export interface ConsultantListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    page: number;
    resultsPerPage: number;
}

export interface ConsultantUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: string | null;
    customerId: number;
    customer: CustomerUpsertRequestDto | null;
}