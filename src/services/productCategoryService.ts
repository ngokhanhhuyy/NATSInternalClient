import { useApiClient } from "./apiClient";
import type {
    ProductCategoryListResponseDto, 
    ProductCategoryResponseDto } from "./dtos/responseDtos/productCategoryResponseDtos";
import type { ProductCategoryUpsertRequestDto } from "./dtos/requestDtos/productCategoryRequestDtos";

export function useProductCategoryService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(): Promise<ProductCategoryListResponseDto> {
            return await apiClient
                .getAsync<ProductCategoryListResponseDto>("/productCategory/list");
        },
    
        async getDetailAsync(id: number): Promise<ProductCategoryResponseDto> {
            return await apiClient
                .getAsync<ProductCategoryResponseDto>(`/productCategory/${id}/detail`);
        },
    
        async createAsync(requestDto: ProductCategoryUpsertRequestDto): Promise<number> {
            return await apiClient
                .postAsync<number>("/productCategory/create", requestDto);
        },
    
        async updateAsync(id: number, requestDto: ProductCategoryUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/productCategory/${id}/update`, requestDto);
        },
    
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/productCategory/${id}/delete`);
        },
    }
}