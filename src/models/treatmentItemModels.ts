import type { TreatmentItemRequestDto } from "@/services/dtos/requestDtos";
import type { TreatmentItemResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { ProductBasicModel } from "./productModels";

export class TreatmentItemModel extends Model {
    public id: number | null = null;
    public amount: number = 0;
    public vatPercentage: number = 0;
    public quantity: number = 1;
    public productId: number;
    public product: ProductBasicModel | null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | TreatmentItemResponseDto) {
        super();
        if (arg instanceof ProductBasicModel) {
            this.amount = arg.price;
            this.productId = arg.id;
            this.product = arg;
            this.hasBeenChanged = true;
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.vatPercentage = arg.vatFactor * 100;
            this.quantity = arg.quantity;
            this.productId = arg.product.id;
            this.product = new ProductBasicModel(arg.product);
        }
    }

    public toRequestDto(): TreatmentItemRequestDto {
        return {
            id: this.id,
            amount: this.amount,
            vatFactor: this.vatPercentage / 100,
            quantity: this.quantity,
            productId: this.productId,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}