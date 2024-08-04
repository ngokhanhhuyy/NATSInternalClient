import type {
    ProductCategoryRequestDto,
    ProductCategoryUpsertRequestDto } from "@/services/dtos/requestDtos/productCategoryRequestDtos";
import type {
    ProductCategoryAuthorizationResponseDto,
    ProductCategoryListResponseDto,
    ProductCategoryResponseDto } from "@/services/dtos/responseDtos/productCategoryResponseDtos";
import { Model } from "./baseModels";

export class ProductCategoryModel extends Model {
    public id: number = 0;
    public name: string = "";

    constructor(responseDto?: ProductCategoryResponseDto) {
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.name = responseDto.name;
        }
    }

    public toRequestDto(): ProductCategoryRequestDto {
        return { id: this.id };
    }

    public toUpsertRequestDto(): ProductCategoryUpsertRequestDto {
        return { name: this.name };
    }
}

export class ProductCategoryListModel extends Model {
    public items: ProductCategoryModel[] = [];
    public authorization: ProductCategoryAuthorizationModel | null = null;

    constructor(responseDto?: ProductCategoryListResponseDto) {
        super();
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
            this.authorization = new ProductCategoryAuthorizationModel(responseDto.authorization);
        }
    }

    public mapFromResponseDto(responseDto: ProductCategoryListResponseDto) {
        if (responseDto.items) {
            this.items = responseDto.items?.map(dto => new ProductCategoryModel(dto));
        } else {
            this.items = [];
        }
    }
}

export class ProductCategoryAuthorizationModel extends Model {
    public canCreate: boolean;
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ProductCategoryAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}