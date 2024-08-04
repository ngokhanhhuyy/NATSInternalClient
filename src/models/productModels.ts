import type {
    ProductBasicResponseDto,
    ProductDetailResponseDto,
    ProductListResponseDto } from "@/services/dtos/responseDtos/productResponseDtos";
import { BrandBasicModel } from "./brandModels";
import { ProductCategoryModel } from "./productCategoryModels";
import type { ProductListRequestDto, ProductUpsertRequestDto } from "@/services/dtos/requestDtos/productRequestDtos";
import { Model } from "./baseModels";
import type { SupplyListModel } from "./supplyModels";

export class ProductBasicModel extends Model {
    public id: number;
    public name: string;
    public unit: string;
    public price: number;
    public stockingQuantity: number;
    public thumbnailUrl: string;

    constructor(responseDto: ProductBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.unit = responseDto.unit;
        this.price = responseDto.price;
        this.stockingQuantity = responseDto.stockingQuantity;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? this.getDefaultPhotoUrl();
    }
}

export class ProductListModel extends Model {
    public categoryName: string | null = null;
    public brandId: number | null = null;
    public productName: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ProductBasicModel[] = [];
    public pageCount: number = 0;

    constructor(categoryName?: string, brandId?: number, resultsPerPage?: number) {
        super();
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

export class ProductDetailModel extends Model {
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
    public lastestSupplies: SupplyListModel;

    constructor(
            productResponseDto: ProductDetailResponseDto,
            supplyListModel: SupplyListModel)
    {
        super();
        this.id = productResponseDto.id;
        this.name = productResponseDto.name;
        this.description = productResponseDto.description;
        this.unit = productResponseDto.unit;
        this.price = productResponseDto.price;
        this.vatFactor = productResponseDto.vatFactor;
        this.stockingQuantity = productResponseDto.stockingQuantity;
        this.isForRetail = productResponseDto.isForRetail;
        this.isDiscontinued = productResponseDto.isDiscontinued;
        this.createdDateTime = this
            .convertToDisplayDateString(productResponseDto.createdDateTime);
        this.updatedDateTime = productResponseDto.updatedDateTime && this
            .convertToDisplayDateTimeString(productResponseDto.updatedDateTime);
        this.thumbnailUrl = productResponseDto.thumbnailUrl ?? this.getDefaultPhotoUrl();
        this.category = productResponseDto.category &&
            new ProductCategoryModel(productResponseDto.category);
        this.brand = productResponseDto.brand && new BrandBasicModel(productResponseDto.brand);
        this.lastestSupplies = supplyListModel;
    }
}

export class ProductUpsertModel extends Model {
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
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.name = responseDto.name;
            this.description = responseDto.description || "";
            this.unit = responseDto.unit;
            this.price = responseDto.price;
            this.vatFactor = responseDto.vatFactor;
            this.isForRetail = responseDto.isForRetail;
            this.isDiscontinued = responseDto.isDiscontinued;
            this.thumbnailUrl = responseDto.thumbnailUrl ?? this.getDefaultPhotoUrl();
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
            category: this.category && this.category.toRequestDto(),
            brand: this.brand && this.brand.toRequestDto()
        };
    }
}