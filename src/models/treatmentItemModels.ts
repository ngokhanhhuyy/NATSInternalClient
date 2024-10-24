import { ProductBasicModel } from "./productModels";

export class TreatmentDetailItemModel implements IProductExportableDetailItemModel {
    public id: number | null = null;
    public productAmountPerUnit: number = 0;
    public vatAmountPerUnit: number = 0;
    public quantity: number = 1;
    public productId: number;
    public product: ProductBasicModel | null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto: TreatmentItemResponseDto) {
        this.id = responseDto.id;
        this.productAmountPerUnit = responseDto.productAMountPerUnit;
        this.vatAmountPerUnit = responseDto.vatAmountPerUnit;
        this.quantity = responseDto.quantity;
        this.productId = responseDto.product.id;
        this.product = new ProductBasicModel(responseDto.product);
    }

    public get productAmount(): number {
        return this.productAmountPerUnit * this.quantity;
    }
}

export class TreatmentUpsertItemModel
        implements IProductExportableUpsertItemModel {
    public id: number | null = null;
    public productAmountPerUnit: number = 0;
    public vatPercentagePerUnit: number = 0;
    public quantity: number = 1;
    public product: ProductBasicModel;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(arg: ProductBasicModel | TreatmentItemResponseDto) {
        if (arg instanceof ProductBasicModel) {
            this.productAmountPerUnit = arg.defaultPrice;
            this.product = arg;
            this.hasBeenChanged = true;
        } else {
            this.id = arg.id;
            this.productAmountPerUnit = arg.productAMountPerUnit;
            this.vatPercentagePerUnit = arg.vatAmountPerUnit * 100;
            this.quantity = arg.quantity;
            this.product = new ProductBasicModel(arg.product);
        }
    }

    public get vatAmountPerUnit(): number {
        return this.productAmountPerUnit * (this.vatPercentagePerUnit / 100);
    }

    public toRequestDto(): TreatmentItemRequestDto {
        return {
            id: this.id,
            productAmountPerUnit: this.productAmountPerUnit,
            vatAmountPerUnit: this.vatAmountPerUnit,
            quantity: this.quantity,
            productId: this.product?.id ?? 0,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}