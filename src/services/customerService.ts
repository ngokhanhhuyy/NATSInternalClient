import { useApiClient } from "./apiClient";
import type {
    CustomerListRequestDto,
    CustomerUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    CustomerBasicResponseDto,
    CustomerCreateResponseDto,
    CustomerDetailResponseDto,
    CustomerListResponseDto
} from "@/services/dtos/responseDtos/customerResponseDtos";

export function useCustomerService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: CustomerListRequestDto): Promise<CustomerListResponseDto> {
            return await apiClient
                .getAsync<CustomerListResponseDto>("/customer", requestDto);
        },
    
        async getBasicAsync(id: number): Promise<CustomerBasicResponseDto> {
            return await apiClient
                .getAsync<CustomerBasicResponseDto>(`/customer/${id}/basic`);
        },
    
        async getDetailAsync(id: number): Promise<CustomerDetailResponseDto> {
            return await apiClient
                .getAsync<CustomerDetailResponseDto>(`/customer/${id}`);
        },
    
        async createAsync(requestDto: CustomerUpsertRequestDto): Promise<CustomerCreateResponseDto> {
            return await apiClient
                .postAsync<CustomerCreateResponseDto>("/customer", requestDto);
        },
    
        async updateAsync(id: number, requestDto: CustomerUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/customer/${id}`, requestDto);
        },
    
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/customer/${id}`);
        },
    };
}