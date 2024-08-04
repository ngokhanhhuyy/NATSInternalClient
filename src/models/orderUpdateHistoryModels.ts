import type {
    OrderUpdateHistoryResponseDto,
    OrderItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderUpdateHistoryModel {
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
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newPaidDateTime);
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