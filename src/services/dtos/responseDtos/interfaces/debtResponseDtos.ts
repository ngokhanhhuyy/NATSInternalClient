import type { ICustomerEngageableBasicResponseDto } from "./customerEngageableResponseDtos";
import type {
    IFinancialEngageableDetailResponseDto,
    IFinancialEngageableUpdateHistoryResponseDto } from "./financialEngageableResponseDtos";

export interface IDebtDetailResponseDto
        extends ICustomerEngageableBasicResponseDto, IFinancialEngageableDetailResponseDto {
    updateHistories: IDebtUpdateHistoryResponseDto[] | null;
}

export interface IDebtUpdateHistoryResponseDto
        extends IFinancialEngageableUpdateHistoryResponseDto {
    oldAmount: number;
    newAmount: number;
}