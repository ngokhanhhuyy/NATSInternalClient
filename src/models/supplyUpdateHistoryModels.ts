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
        this.reason = responseDto.updatedReason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldStatsDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldStatsDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldStatsDateTime);
        this.oldShipmentFee = responseDto.oldShipmentFee;
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new SupplyItemUpdateHistoryModel(i))
            ?? [];
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newStatsDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newStatsDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newStatsDateTime);
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
        this.amount = dataDto.productAmountPerUnit;
        this.suppliedQuantity = dataDto.quantity;
        this.productName = dataDto.productName;
    }
}