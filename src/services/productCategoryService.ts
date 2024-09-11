import { useApiClient } from "./apiClient";
import type {
    ProductCategoryListResponseDto, 
    ProductCategoryResponseDto } from "./dtos/responseDtos";
import type { ProductCategoryUpsertRequestDto } from "./dtos/requestDtos";

export function useProductCategoryService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(): Promise<ProductCategoryListResponseDto> {
            return await apiClient
                .getAsync<ProductCategoryListResponseDto>("/productCategory");
        },
    
        async getDetailAsync(id: number): Promise<ProductCategoryResponseDto> {
            return await apiClient
                .getAsync<ProductCategoryResponseDto>(`/productCategory/${id}`);
        },
    
        async createAsync(requestDto: ProductCategoryUpsertRequestDto): Promise<number> {
            return await apiClient
                .postAsync<number>("/productCategory/create", requestDto);
        },
    
        async updateAsync(
                id: number,
                requestDto: ProductCategoryUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/productCategory/${id}`, requestDto);
        },
    
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/productCategory/${id}`);
        },
    };
}