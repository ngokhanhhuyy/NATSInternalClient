import { BrandBasicModel } from "./brandModels";
import {
    ProductCategoryBasicModel } from "./productCategoryModels";
import { ProductPhotoModel } from "./productPhotoModels";
import { DateTimeDisplayModel } from "./dateTimeModels";
import { usePhotoUtility } from "@/utilities/photoUtility";
import type { ListSortingOptionsModel } from "./listSortingModels";

const photoUtility = usePhotoUtility();

export class ProductBasicModel
        implements IUpsertableBasicModel<ProductExistingAuthorizationModel> {
    public id: number;
    public name: string;
    public unit: string;
    public defaultPrice: number;
    public defaultVatPercentage: number;
    public stockingQuantity: number;
    public thumbnailUrl: string;
    public authorization: ProductExistingAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.Product.Basic) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.unit = responseDto.unit;
        this.defaultPrice = responseDto.defaultPrice;
        this.defaultVatPercentage = responseDto.defaultVatPercentage;
        this.stockingQuantity = responseDto.stockingQuantity;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = responseDto.authorization &&
            new ProductExistingAuthorizationModel(responseDto.authorization);
    }
}

export class ProductListModel
        implements IUpsertableListModel<
            ProductBasicModel,
            ProductExistingAuthorizationModel> {
    public sortByAscending: boolean | undefined;
    public sortByField: string | undefined;
    public sortingOptions: ListSortingOptionsModel | undefined;
    public categoryId: number | null = null;
    public brandId: number | null = null;
    public productName: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ProductBasicModel[] = [];
    public pageCount: number = 0;

    constructor(
            responseDto: ResponseDtos.Product.List,
            requestDto?: RequestDtos.Product.List) {
        this.mapFromResponseDto(responseDto);
        if (requestDto) {
            Object.assign(this, requestDto);
        }
    }

    public mapFromResponseDto(responseDto: ResponseDtos.Product.List): void {
        this.items = responseDto.items?.map(dto => new ProductBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): RequestDtos.Product.List {
        return {
            categoryId: this.categoryId ?? undefined,
            brandId: this.brandId ?? undefined,
            productName: this.productName ?? undefined,
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
    public defaultPrice: number;
    public defaultVatPercentage: number;
    public stockingQuantity: number;
    public isForRetail: boolean;
    public isDiscontinued: boolean;
    public createdDateTime: DateTimeDisplayModel;
    public updatedDateTime: DateTimeDisplayModel | null;
    public thumbnailUrl: string;
    public category: ProductCategoryBasicModel | null;
    public brand: BrandBasicModel | null;

    constructor(responseDto: ResponseDtos.Product.Detail) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.description = responseDto.description;
        this.unit = responseDto.unit;
        this.defaultPrice = responseDto.defaultPrice;
        this.defaultVatPercentage = responseDto.defaultVatPercentage;
        this.stockingQuantity = responseDto.stockingQuantity;
        this.isForRetail = responseDto.isForRetail;
        this.isDiscontinued = responseDto.isDiscontinued;
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime
            ? new DateTimeDisplayModel(responseDto.updatedDateTime)
            : null;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.category = responseDto.category &&
            new ProductCategoryBasicModel(responseDto.category);
        this.brand = responseDto.brand && new BrandBasicModel(responseDto.brand);
    }
}

export class ProductUpsertModel {
    public id: number = 0;
    public name: string = "";
    public description: string = "";
    public unit: string = "";
    public defaultPrice: number = 0;
    public defaultVatPercentage: number = 0.1;
    public isForRetail: boolean = true;
    public isDiscontinued: boolean = false;
    public thumbnailUrl: string | null = null;
    public thumbnailFile: string | null = null;
    public thumbnailChanged: boolean = false;
    public categoryId: number | null = null;
    public brandId: number | null = null;
    public photos: ProductPhotoModel[] = [];

    constructor(responseDto?: ResponseDtos.Product.Detail) {
        if (responseDto) {
            this.id = responseDto.id;
            this.name = responseDto.name;
            this.description = responseDto.description || "";
            this.unit = responseDto.unit;
            this.defaultPrice = responseDto.defaultPrice;
            this.defaultVatPercentage = responseDto.defaultVatPercentage;
            this.isForRetail = responseDto.isForRetail;
            this.isDiscontinued = responseDto.isDiscontinued;
            this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
            this.categoryId = responseDto.category?.id ?? null;
            this.brandId = responseDto.brand?.id ?? null;
        }
    }

    public toRequestDto(): RequestDtos.Product.Upsert {
        return {
            name: this.name,
            description: this.description || null,
            unit: this.unit,
            defaultPrice: this.defaultPrice,
            defaultVatPercentage: this.defaultVatPercentage,
            isForRetail: this.isForRetail,
            isDiscontinued: this.isDiscontinued,
            thumbnailFile: this.thumbnailFile,
            thumbnailChanged: this.thumbnailChanged,
            categoryId: this.categoryId,
            brandId: this.brandId,
            photos: this.photos.length ? this.photos.map(p => p.toRequestDto()) : null
        };
    }
}

export class ProductExistingAuthorizationModel
        implements IUpsertableExistingAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;

    constructor(responseDto: ResponseDtos.Product.ExistingAuthorization) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}