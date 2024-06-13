import { useApiClient } from "./apiClient";
import type { CustomerListRequestDto, CustomerUpsertRequestDto } from "@/services/dtos/requestDtos/customerRequestDtos"
import type {
    CustomerBasicResponseDto,
    CustomerCreateResponseDto,
    CustomerDetailResponseDto,
    CustomerListResponseDto
} from "@/services/dtos/responseDtos/customerResponseDtos"

export function useCustomerService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: CustomerListRequestDto): Promise<CustomerListResponseDto> {
            return await apiClient
                .getAsync<CustomerListResponseDto>("/customer/list", requestDto);
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