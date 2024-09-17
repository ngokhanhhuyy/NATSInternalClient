export interface ProductListRequestDto {
    categoryName: string | null;
    brandId: number | null;
    productName: string | null;
    page: number;
    resultsPerPage: number;
}

export interface ProductDetailRequestDto {
    recentSuppliesResultCount: number;
    recentOrdersResultCount: number;
    recentTreatmentsResultCount: number;
}

export interface ProductUpsertRequestDto {
    name: string;
    description: string | null;
    unit: string;
    price: number;
    vatFactor: number;
    isForRetail: boolean;
    isDiscontinued: boolean;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    categoryId: number | null;
    brandId: number | null;
}