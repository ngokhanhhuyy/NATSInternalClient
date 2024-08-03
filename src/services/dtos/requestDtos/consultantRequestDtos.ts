import type { CustomerUpsertRequestDto } from "./customerRequestDtos";

export interface ConsultantListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    page: number;
    resultsPerPage: number;
}

export interface ConsultantUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: DateTimeISOString | null;
    customerId: number;
    customer: CustomerUpsertRequestDto | null;
}