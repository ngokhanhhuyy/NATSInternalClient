import type { SupplyItemRequestDto } from "@/services/dtos/requestDtos";
import type { SupplyItemResponseDto } from "@/services/dtos/responseDtos";
import { ProductBasicModel } from "./productModels";

export class SupplyItemModel {
    public id: number | null = null;
    public amount: number = 0;
    public suppliedQuantity: number = 0;
    public product: ProductBasicModel;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | SupplyItemResponseDto) {
        if (arg instanceof ProductBasicModel) {
            this.product = arg;
            this.amount = this.product.price;
            this.suppliedQuantity = 1;
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.suppliedQuantity = arg.suppliedQuantity;
            this.product = new ProductBasicModel(arg.product);
        }
    }

    public toRequestDto(): SupplyItemRequestDto {
        return {
            id: this.id,
            amount: this.amount,
            suppliedQuantity: this.suppliedQuantity,
            productId: this.product.id,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}