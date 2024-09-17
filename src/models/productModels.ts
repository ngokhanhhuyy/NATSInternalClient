import type {
    ProductBasicResponseDto,
    ProductDetailResponseDto,
    ProductListResponseDto } from "@/services/dtos/responseDtos/productResponseDtos";
import { BrandBasicModel } from "./brandModels";
import { ProductCategoryModel } from "./productCategoryModels";
import type {
    ProductListRequestDto,
    ProductUpsertRequestDto, } from "@/services/dtos/requestDtos/productRequestDtos";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class ProductBasicModel {
    public id: number;
    public name: string;
    public unit: string;
    public price: number;
    public stockingQuantity: number;
    public thumbnailUrl: string;

    constructor(responseDto: ProductBasicResponseDto) {
        const photoUtility = usePhotoUtility();

        this.id = responseDto.id;
        this.name = responseDto.name;
        this.unit = responseDto.unit;
        this.price = responseDto.price;
        this.stockingQuantity = responseDto.stockingQuantity;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
    }
}

export class ProductListModel {
    public categoryName: string | null = null;
    public brandId: number | null = null;
    public productName: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ProductBasicModel[] = [];
    public pageCount: number = 0;

    constructor(categoryName?: string, brandId?: number, resultsPerPage?: number) {
        if (categoryName) {
            this.categoryName = categoryName;
        }

        if (brandId) {
            this.brandId = brandId;
        }

        if (resultsPerPage) {
            this.resultsPerPage = resultsPerPage;
        }
    }

    public mapFromResponseDto(responseDto: ProductListResponseDto): void {
        this.items = responseDto.items?.map(dto => new ProductBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): ProductListRequestDto {
        return {
            categoryName: this.categoryName,
            brandId: this.brandId,
            productName: this.productName || null,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ProductDetailModel {
    public id: number;
    public name: string;
    public description: string | null;
    public unit: string;
    public price: number;
    public vatFactor: number;
    public stockingQuantity: number;
    public isForRetail: boolean;
    public isDiscontinued: boolean;
    public createdDateTime: string;
    public updatedDateTime: string | null;
    public thumbnailUrl: string;
    public category: ProductCategoryModel | null;
    public brand: BrandBasicModel | null;

    constructor(productResponseDto: ProductDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        const photoUtility = usePhotoUtility();

        this.id = productResponseDto.id;
        this.name = productResponseDto.name;
        this.description = productResponseDto.description;
        this.unit = productResponseDto.unit;
        this.price = productResponseDto.price;
        this.vatFactor = productResponseDto.vatFactor;
        this.stockingQuantity = productResponseDto.stockingQuantity;
        this.isForRetail = productResponseDto.isForRetail;
        this.isDiscontinued = productResponseDto.isDiscontinued;
        this.createdDateTime = dateTimeUtility
            .getDisplayDateString(productResponseDto.createdDateTime);
        this.updatedDateTime = productResponseDto.updatedDateTime && dateTimeUtility
            .getDisplayDateTimeString(productResponseDto.updatedDateTime);
        this.thumbnailUrl = productResponseDto.thumbnailUrl
            ?? photoUtility.getDefaultPhotoUrl();
        this.category = productResponseDto.category &&
            new ProductCategoryModel(productResponseDto.category);
        this.brand = productResponseDto.brand && new BrandBasicModel(productResponseDto.brand);
    }
}

export class ProductUpsertModel {
    public id: number = 0;
    public name: string = "";
    public description: string = "";
    public unit: string = "";
    public price: number = 0;
    public vatFactor: number = 0.1;
    public isForRetail: boolean = true;
    public isDiscontinued: boolean = false;
    public thumbnailUrl: string | null = null;
    public thumbnailFile: string | null = null;
    public thumbnailChanged: boolean = false;
    public category: ProductCategoryModel | null = null;
    public brand: BrandBasicModel | null = null;

    constructor(responseDto?: ProductDetailResponseDto) {
        if (responseDto) {
            const photoUtility = usePhotoUtility();
            
            this.id = responseDto.id;
            this.name = responseDto.name;
            this.description = responseDto.description || "";
            this.unit = responseDto.unit;
            this.price = responseDto.price;
            this.vatFactor = responseDto.vatFactor;
            this.isForRetail = responseDto.isForRetail;
            this.isDiscontinued = responseDto.isDiscontinued;
            this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
            this.category = responseDto.category && new ProductCategoryModel(responseDto.category);
            this.brand = responseDto.brand && new BrandBasicModel(responseDto.brand);
        }
    }

    public toRequestDto(): ProductUpsertRequestDto {
        return {
            name: this.name,
            description: this.description || null,
            unit: this.unit,
            price: this.price,
            vatFactor: this.vatFactor,
            isForRetail: this.isForRetail,
            isDiscontinued: this.isDiscontinued,
            thumbnailFile: this.thumbnailFile,
            thumbnailChanged: this.thumbnailChanged,
            categoryId: this.category?.id ?? null,
            brandId: this.brand?.id ?? null
        };
    }
}