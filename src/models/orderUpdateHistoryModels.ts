import type {
    OrderUpdateHistoryResponseDto,
    OrderItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { UserBasicModel } from "./userModels";

export class OrderUpdateHistoryModel extends Model {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldNote: string;
    public oldItems: OrderItemUpdateHistoryModel[];
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newNote: string;
    public newItems: OrderItemUpdateHistoryModel[];

    constructor(responseDto: OrderUpdateHistoryResponseDto) {
        super();
        this.updatedDate = this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = this.convertToDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = this.convertToDisplayTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = this.convertToDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = this.convertToDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = this.convertToDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newNote = responseDto.newNote ?? "";
        this.newItems = responseDto.newItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
    }
}

export class OrderItemUpdateHistoryModel extends Model {
    public id: number;
    public amount: number;
    public vatPercentage: number;
    public quantity: number;
    public productName: string;

    constructor(dataDto: OrderItemUpdateHistoryDataDto) {
        super();
        this.id = dataDto.id;
        this.amount = dataDto.amount;
        this.vatPercentage = Math.round(dataDto.vatFactor * 100);
        this.quantity = dataDto.quantity;
        this.productName = dataDto.productName;
    }
}