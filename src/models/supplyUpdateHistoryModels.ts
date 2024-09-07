import type {
    SupplyUpdateHistoryResponseDto,
    SupplyItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class SupplyUpdateHistoryModel {
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
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldShipmentFee = responseDto.oldShipmentFee;
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newPaidDateTime);
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