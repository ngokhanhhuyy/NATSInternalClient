import type {
    SupplyUpdateHistoryResponseDto,
    SupplyItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class SupplyUpdateHistoryModel {
    public updatedDate: DisplayDateString;
    public updatedTime: DisplayTimeString;
    public updatedDateTime: DisplayDateTimeString;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: DisplayDateString;
    public oldPaidTime: DisplayTimeString;
    public oldPaidDateTime: DisplayDateTimeString;
    public oldShipmentFee: number;
    public oldNote: string;
    public oldItems: SupplyItemUpdateHistoryModel[];
    public newPaidDate: DisplayDateString;
    public newPaidTime: DisplayTimeString;
    public newPaidDateTime: DisplayDateTimeString;
    public newShipmentFee: number;
    public newNote: string;
    public newItems: SupplyItemUpdateHistoryModel[];

    constructor(responseDto: SupplyUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = responseDto.oldPaidDateTime.toDisplayDateString();
        this.oldPaidTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldPaidDateTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldShipmentFee = responseDto.oldShipmentFee;
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = responseDto.newPaidDateTime.toDisplayDateString();
        this.newPaidTime = responseDto.newPaidDateTime.toDisplayTimeString();
        this.newPaidDateTime = responseDto.newPaidDateTime.toDisplayDateTimeString();
        this.newShipmentFee = responseDto.newShipmentFee;
        this.newNote = responseDto.newNote ?? "";
        this.newItems = responseDto.newItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
    }
}

export class SupplyItemUpdateHistoryModel {
    public id: number;
    public amount: number;
    public suppliedQuantity: number;
    public productName: string;

    constructor(dataDto: SupplyItemUpdateHistoryDataDto) {
        this.id = dataDto.id;
        this.amount = dataDto.amount;
        this.suppliedQuantity = dataDto.suppliedQuantity;
        this.productName = dataDto.productName;
    }
}