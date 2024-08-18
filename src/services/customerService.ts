import { useApiClient } from "./apiClient";
import type {
    CustomerListRequestDto,
    CustomerUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    CustomerBasicResponseDto,
    CustomerCreateResponseDto,
    CustomerDetailResponseDto,
    CustomerListResponseDto
} from "@/services/dtos/responseDtos";

export interface ICustomerService {
    getListAsync(requestDto?: CustomerListRequestDto): Promise<CustomerListResponseDto>;
    getListAsync(hasRemainingDebtAmountOnly?: boolean): Promise<CustomerListResponseDto>;
    getBasicAsync(id: number): Promise<CustomerBasicResponseDto>;
    getDetailAsync(id: number): Promise<CustomerDetailResponseDto>;
    createAsync(requestDto: CustomerUpsertRequestDto): Promise<CustomerCreateResponseDto>;
    updateAsync(id: number, requestDto: CustomerUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useCustomerService(): ICustomerService {
    const apiClient = useApiClient();

    return {
        async getListAsync(
                arg?: CustomerListRequestDto | boolean): Promise<CustomerListResponseDto>
        {
            if (arg == null) {
                return await apiClient.getAsync<CustomerListResponseDto>("/customer/list");
            }

            if (typeof arg === "boolean") {
                return await apiClient
                    .getAsync<CustomerListResponseDto>("/customer/list", {
                        hasRemainingDebtAmountOnly: arg
                    });
            }

            return await apiClient
                .getAsync<CustomerListResponseDto>("/customer/list", arg);
        },
    
        async getBasicAsync(id: number): Promise<CustomerBasicResponseDto> {
            return await apiClient
                .getAsync<CustomerBasicResponseDto>(`/customer/${id}/basic`);
        },
    
        async getDetailAsync(id: number): Promise<CustomerDetailResponseDto> {
            return await apiClient
                .getAsync<CustomerDetailResponseDto>(`/customer/${id}/detail`);
        },
    
        async createAsync(requestDto: CustomerUpsertRequestDto): Promise<CustomerCreateResponseDto> {
            return await apiClient
                .postAsync<CustomerCreateResponseDto>("/customer/create", requestDto);
        },
    
        async updateAsync(id: number, requestDto: CustomerUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/customer/${id}/update`, requestDto);
        },
    
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/customer/${id}/delete`);
        },
    }
}