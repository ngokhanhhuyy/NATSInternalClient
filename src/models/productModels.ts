import type {
    ProductBasicResponseDto, ProductDetailResponseDto,
    ProductListResponseDto, ProductListAuthorizationResponseDto,
    ProductAuthorizationResponseDto } from "@/services/dtos/responseDtos";
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
    public authorization: ProductListAuthorizationModel | null = null;

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
        this.authorization = new ProductListAuthorizationModel(responseDto.authorization);
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
    public authorization: ProductAuthorizationModel;

    constructor(responseDto: ProductDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        const photoUtility = usePhotoUtility();

        this.id = responseDto.id;
        this.name = responseDto.name;
        this.description = responseDto.description;
        this.unit = responseDto.unit;
        this.price = responseDto.price;
        this.vatFactor = responseDto.vatFactor;
        this.stockingQuantity = responseDto.stockingQuantity;
        this.isForRetail = responseDto.isForRetail;
        this.isDiscontinued = responseDto.isDiscontinued;
        this.createdDateTime = dateTimeUtility
            .getDisplayDateString(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime && dateTimeUtility
            .getDisplayDateTimeString(responseDto.updatedDateTime);
        this.thumbnailUrl = responseDto.thumbnailUrl
            ?? photoUtility.getDefaultPhotoUrl();
        this.category = responseDto.category &&
            new ProductCategoryModel(responseDto.category);
        this.brand = responseDto.brand && new BrandBasicModel(responseDto.brand);
        this.authorization = new ProductAuthorizationModel(responseDto.authorization);
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
    public authorization: ProductAuthorizationModel | null = null;

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
            this.category = responseDto.category
                && new ProductCategoryModel(responseDto.category);
            this.brand = responseDto.brand && new BrandBasicModel(responseDto.brand);
            this.authorization = new ProductAuthorizationModel(responseDto.authorization);
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

export class ProductListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: ProductListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class ProductAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;

    constructor(responseDto: ProductAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}