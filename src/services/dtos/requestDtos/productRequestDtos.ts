declare global {
    interface ProductListRequestDto {
        categoryName: string | null;
        brandId: number | null;
        productName: string | null;
        page: number;
        resultsPerPage: number;
    }
    
    interface ProductDetailRequestDto {
        recentSuppliesResultCount: number;
        recentOrdersResultCount: number;
        recentTreatmentsResultCount: number;
    }
    
    interface ProductUpsertRequestDto {
        name: string;
        description: string | null;
        unit: string;
        defaultPrice: number;
        defaultVatPercentage: number;
        isForRetail: boolean;
        isDiscontinued: boolean;
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
        categoryId: number | null;
        brandId: number | null;
        photos: ProductUpsertPhotoRequestDto[] | null;
    }
}

export { };