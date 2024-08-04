import type {
    SupplyUpdateHistoryResponseDto,
    SupplyItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { UserBasicModel } from "./userModels";

export class SupplyUpdateHistoryModel extends Model {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldShipmentFee: number;
    public oldNote: string;
    public oldItems: SupplyItemUpdateHistoryModel[];
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newShipmentFee: number;
    public newNote: string;
    public newItems: SupplyItemUpdateHistoryModel[];

    constructor(responseDto: SupplyUpdateHistoryResponseDto) {
        super();
        this.updatedDate = this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = this.convertToDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldShipmentFee = responseDto.oldShipmentFee;
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = this.convertToDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = this.convertToDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = this.convertToDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newShipmentFee = responseDto.newShipmentFee;
        this.newNote = responseDto.newNote ?? "";
        this.newItems = responseDto.newItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
    }
}

export class SupplyItemUpdateHistoryModel extends Model {
    public id: number;
    public amount: number;
    public suppliedQuantity: number;
    public productName: string;

    constructor(dataDto: SupplyItemUpdateHistoryDataDto) {
        super();
        this.id = dataDto.id;
        this.amount = dataDto.amount;
        this.suppliedQuantity = dataDto.suppliedQuantity;
        this.productName = dataDto.productName;
    }
}