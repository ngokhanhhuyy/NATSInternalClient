import type { CustomerBasicResponseDto } from "../customerResponseDtos";
import type { IFinancialEngageableBasicResponseDto } from "./financialEngageableResponseDtos";

export interface ICustomerEngageableBasicResponseDto
        extends IFinancialEngageableBasicResponseDto {
    customer: CustomerBasicResponseDto;
}