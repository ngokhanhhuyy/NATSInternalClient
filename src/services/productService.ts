import { useApiClient } from "./apiClient";
import type {
    ProductListRequestDto,
    ProductUpsertRequestDto } from "@/services/dtos/requestDtos/productRequestDtos";
import type {
    ProductListResponseDto, 
    ProductDetailResponseDto } from "./dtos/responseDtos/productResponseDtos";

export function useProductService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: ProductListRequestDto): Promise<ProductListResponseDto> {
            return await apiClient
                .getAsync<ProductListResponseDto>("/product/list", requestDto);
        },
    
        async getDetailAsync(id: number): Promise<ProductDetailResponseDto> {
            return await apiClient
                .getAsync<ProductDetailResponseDto>(`/product/${id}/detail`);
        },
    
        async createAsync(requestDto: ProductUpsertRequestDto): Promise<number> {
            return await apiClient
                .postAsync<number>("/product/create", requestDto);
        },
    
        async updateAsync(id: number, requestDto: ProductUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/product/${id}/update`, requestDto);
        },
    
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/product/${id}/delete`);
        }
    }
}