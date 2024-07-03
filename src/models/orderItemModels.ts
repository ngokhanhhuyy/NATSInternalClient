import type { OrderItemResponseDto } from "@/services/dtos/responseDtos/orderItemResponseDtos";
import { ProductBasicModel } from "./productModels";
import type { OrderItemRequestDto } from "@/services/dtos/requestDtos/orderItemRequestDtos";

export class OrderItemModel {
    public id: number | null = null;
    public amount: number = 0;
    public vatFactor: number = 0;
    public quantity: number = 1;
    public productId: number;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | OrderItemResponseDto) {
        if (arg instanceof ProductBasicModel) {
            this.productId = arg.id;
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.vatFactor = arg.vatFactor;
            this.quantity = arg.quantity;
            this.productId = arg.product.id;
        }
    }

    public toRequestDto(): OrderItemRequestDto {
        return {
            id: this.id,
            amount: this.amount,
            vatFactor: this.vatFactor,
            quantity: this.quantity,
            productId: this.productId,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}