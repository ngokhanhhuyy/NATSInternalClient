import type {
    TreatmentItemUpdateHistoryDataDto,
    TreatmentUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class TreatmentUpdateHistoryModel {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldServiceAmount: number;
    public oldVatPercentage: number;
    public oldNote: string | null;
    public oldTherapist: UserBasicModel;
    public oldItems: TreatmentItemUpdateHistoryModel[];
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newServiceAmount: number;
    public newVatPercentage: number;
    public newNote: string | null;
    public newTherapist: UserBasicModel;
    public newItems: TreatmentItemUpdateHistoryModel[];

    constructor(responseDto: TreatmentUpdateHistoryResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldServiceAmount = responseDto.oldServiceAmount;
        this.oldVatPercentage = Math.round(responseDto.oldServiceVatFactor * 100);
        this.oldNote = responseDto.oldNote;
        this.oldTherapist = new UserBasicModel(responseDto.oldTherapist);
        this.oldItems = responseDto.oldItems?.map(i => new TreatmentItemUpdateHistoryModel(i)) ?? [];
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newServiceAmount = responseDto.newServiceAmount;
        this.newVatPercentage = Math.round(responseDto.newServiceVatFactor * 100);
        this.newNote = responseDto.newNote;
        this.newTherapist = new UserBasicModel(responseDto.newTherapist);
        this.newItems = responseDto.newItems?.map(i => new TreatmentItemUpdateHistoryModel(i)) ?? [];
    }
}

export class TreatmentItemUpdateHistoryModel {
    public id: number;
    public amount: number;
    public vatPercentage: number;
    public quantity: number;
    public productName: string;

    constructor(responseDto: TreatmentItemUpdateHistoryDataDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.vatPercentage = Math.round(responseDto.vatFactor * 100);
        this.quantity = responseDto.quantity;
        this.productName = responseDto.productName;
    }
}