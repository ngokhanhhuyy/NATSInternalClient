declare global {
    interface ProductCategoryListRequestDto {
        orderByAscending: boolean;
        orderByField: string ;
        page: number;
        resultsPerPage: number;
    }
    
    interface ProductCategoryRequestDto {
        id: number;
    }
    
    interface ProductCategoryUpsertRequestDto {
        name: string;
    }
}

export { };