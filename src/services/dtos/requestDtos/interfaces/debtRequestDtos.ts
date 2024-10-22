import type { IFinancialEngageableUpsertRequestDto } from "./financialEngageableRequestDtos";

export interface IDebtUpsertRequestDto extends IFinancialEngageableUpsertRequestDto {
    amount: number;
}