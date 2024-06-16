import type { SupplyItemRequestDto } from "@/services/dtos/requestDtos/supplyItemRequestDtos";
import type { SupplyItemResponseDto } from "@/services/dtos/responseDtos/supplyItemResponseDtos";
import { ProductBasicModel } from "./productModels";

export class SupplyItemModel {
    public id: number | null = null;
    public amount: number = 0;
    public vatFactor: number = 0;
    public suppliedQuantity: number = 0;
    public product: ProductBasicModel;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | SupplyItemResponseDto) {
        if (arg instanceof ProductBasicModel) {
            this.product = arg;
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.vatFactor = arg.vatFactor;
            this.suppliedQuantity = arg.suppliedQuantity;
            this.product = new ProductBasicModel(arg.product);
        }
    }

    public toRequestDto(): SupplyItemRequestDto {
        return {
            id: this.id,
            amount: this.amount,
            vatFactor: this.vatFactor,
            suppliedQuantity: this.suppliedQuantity,
            productId: this.product.id,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}