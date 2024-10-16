export interface ProductCategoryListRequestDto {
    orderByAscending: boolean;
    orderByField: string ;
    page: number;
    resultsPerPage: number;
}

export interface ProductCategoryRequestDto {
    id: number;
}

export interface ProductCategoryUpsertRequestDto {
    name: string;
}