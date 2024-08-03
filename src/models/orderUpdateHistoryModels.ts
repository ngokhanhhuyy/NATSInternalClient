import type {
    OrderUpdateHistoryResponseDto,
    OrderItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class OrderUpdateHistoryModel {
    public updatedDate: DisplayDateString;
    public updatedTime: DisplayTimeString;
    public updatedDateTime: DisplayDateTimeString;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: DisplayDateString;
    public oldPaidTime: DisplayTimeString;
    public oldPaidDateTime: DisplayDateTimeString;
    public oldNote: string;
    public oldItems: OrderItemUpdateHistoryModel[];
    public newPaidDate: DisplayDateString;
    public newPaidTime: DisplayTimeString;
    public newPaidDateTime: DisplayDateTimeString;
    public newNote: string;
    public newItems: OrderItemUpdateHistoryModel[];

    constructor(responseDto: OrderUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = responseDto.oldPaidDateTime.toDisplayDateString();
        this.oldPaidTime = responseDto.oldPaidDateTime.toDisplayTimeString();
        this.oldPaidDateTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = responseDto.newPaidDateTime.toDisplayDateString();
        this.newPaidTime = responseDto.newPaidDateTime.toDisplayTimeString();
        this.newPaidDateTime = responseDto.newPaidDateTime.toDisplayDateTimeString();
        this.newNote = responseDto.newNote ?? "";
        this.newItems = responseDto.newItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
    }
}

export class OrderItemUpdateHistoryModel {
    public id: number;
    public amount: number;
    public vatPercentage: number;
    public quantity: number;
    public productName: string;

    constructor(dataDto: OrderItemUpdateHistoryDataDto) {
        this.id = dataDto.id;
        this.amount = dataDto.amount;
        this.vatPercentage = Math.round(dataDto.vatFactor * 100);
        this.quantity = dataDto.quantity;
        this.productName = dataDto.productName;
    }
}