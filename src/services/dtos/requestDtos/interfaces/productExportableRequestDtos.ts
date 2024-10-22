import type {
    ICustomerEngageableListRequestDto,
    ICustomerEngageableUpsertRequestDto } from "./customerEngageableRequestDtos";
import type {
    IProductEngageableListRequestDto,
    IProductEngageableUpsertItemRequestDto, 
    IProductEngageableUpsertRequestDto} from "./productEngageableRequestDtos";

export interface IProductExportableListRequestDto
        extends IProductEngageableListRequestDto, ICustomerEngageableListRequestDto { }

export interface IProductExportableUpsertRequestDto
        extends IProductEngageableUpsertRequestDto, ICustomerEngageableUpsertRequestDto { }

export interface IProductExportableUpsertItemRequestDto
        extends IProductEngageableUpsertItemRequestDto {
    vatAmountPerUnit: number;
}