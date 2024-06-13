import type {
    ProductCategoryRequestDto,
    ProductCategoryUpsertRequestDto } from "@/services/dtos/requestDtos/productCategoryRequestDtos";
import type {
    ProductCategoryAuthorizationResponseDto,
    ProductCategoryListResponseDto,
    ProductCategoryResponseDto } from "@/services/dtos/responseDtos/productCategoryResponseDtos";

export class ProductCategoryModel {
    public id: number = 0;
    public name: string = "";

    constructor(responseDto?: ProductCategoryResponseDto) {
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

export class ProductCategoryListModel {
    public items: ProductCategoryModel[] = [];
    public authorization: ProductCategoryAuthorizationModel | null;

    constructor(responseDto: ProductCategoryListResponseDto) {
        if (responseDto.items) {
            this.items = responseDto.items?.map(dto => new ProductCategoryModel(dto));
        }
        this.authorization = new ProductCategoryAuthorizationModel(responseDto.authorization);
    }
}

export class ProductCategoryAuthorizationModel {
    public canCreate: boolean;
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ProductCategoryAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}