import type { OrderItemResponseDto } from "@/services/dtos/responseDtos/orderItemResponseDtos";
import { ProductBasicModel } from "./productModels";
import type { OrderItemRequestDto } from "@/services/dtos/requestDtos/orderItemRequestDtos";
import type {
    IProductExportableDetailItemModel,
    IProductExportableUpsertItemModel } from "./interfaces";

export class OrderDetailItemModel implements IProductExportableDetailItemModel {
    public readonly id: number | null = null;
    public readonly productAmountPerUnit: number = 0;
    public readonly vatAmountPerUnit: number = 0;
    public readonly quantity: number = 1;
    public readonly productId: number;
    public readonly product: ProductBasicModel | null = null;

    constructor(responseDto: OrderItemResponseDto) {
        this.id = responseDto.id;
        this.productAmountPerUnit = responseDto.productAmountPerUnit;
        this.vatAmountPerUnit = responseDto.vatAmountPerUnit * 100;
        this.quantity = responseDto.quantity;
        this.productId = responseDto.product.id;
        this.product = new ProductBasicModel(responseDto.product);
    }

    public get productAmount(): number {
        return this.productAmountPerUnit * this.quantity;
    }
}

export class OrderUpsertItemModel
        implements IProductExportableUpsertItemModel<OrderItemRequestDto> {
    public id: number | null = null;
    public productAmountPerUnit: number = 0;
    public vatPercentagePerUnit: number = 0;
    public quantity: number = 1;
    public productId: number;
    public product: ProductBasicModel;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | OrderItemResponseDto) {
        if (arg instanceof ProductBasicModel) {
            this.productAmountPerUnit = arg.defaultPrice;
            this.vatPercentagePerUnit = arg.defaultVatPercentage;
            this.productId = arg.id;
            this.product = arg;
            this.hasBeenChanged = true;
        } else {
            this.id = arg.id;
            this.productAmountPerUnit = arg.productAmountPerUnit;
            this.vatPercentagePerUnit = arg.vatAmountPerUnit / arg.productAmountPerUnit;
            this.quantity = arg.quantity;
            this.productId = arg.product.id;
            this.product = new ProductBasicModel(arg.product);
        }
    }

    public get vatAmountPerUnit(): number {
        return this.productAmountPerUnit * (this.vatPercentagePerUnit / 100);
    }

    public toRequestDto(): OrderItemRequestDto {
        return {
            id: this.id,
            productAmountPerUnit: this.productAmountPerUnit,
            vatAmountPerUnit: this.productAmountPerUnit + this.productAmountPerUnit *
                this.vatPercentagePerUnit,
            quantity: this.quantity,
            productId: this.productId,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}