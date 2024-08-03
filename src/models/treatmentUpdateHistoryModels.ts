import type {
    TreatmentItemUpdateHistoryDataDto,
    TreatmentUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class TreatmentUpdateHistoryModel {
    public updatedDate: DisplayDateString;
    public updatedTime: DisplayTimeString;
    public updatedDateTime: DisplayDateTimeString;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: DisplayDateString;
    public oldPaidTime: DisplayTimeString;
    public oldPaidDateTime: DisplayDateTimeString;
    public oldServiceAmount: number;
    public oldVatPercentage: number;
    public oldNote: string | null;
    public oldTherapist: UserBasicModel;
    public oldItems: TreatmentItemUpdateHistoryModel[];
    public newPaidDate: DisplayDateString;
    public newPaidTime: DisplayTimeString;
    public newPaidDateTime: DisplayDateTimeString;
    public newServiceAmount: number;
    public newVatPercentage: number;
    public newNote: string | null;
    public newTherapist: UserBasicModel;
    public newItems: TreatmentItemUpdateHistoryModel[];

    constructor(responseDto: TreatmentUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = responseDto.oldPaidDateTime.toDisplayDateString();
        this.oldPaidTime = responseDto.oldPaidDateTime.toDisplayTimeString();
        this.oldPaidDateTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldServiceAmount = responseDto.oldServiceAmount;
        this.oldVatPercentage = Math.round(responseDto.oldServiceVatFactor * 100);
        this.oldNote = responseDto.oldNote;
        this.oldTherapist = new UserBasicModel(responseDto.oldTherapist);
        this.oldItems = responseDto.oldItems?.map(i => new TreatmentItemUpdateHistoryModel(i)) ?? [];
        this.newPaidDate = responseDto.newPaidDateTime.toDisplayDateString();
        this.newPaidTime = responseDto.newPaidDateTime.toDisplayTimeString();
        this.newPaidDateTime = responseDto.newPaidDateTime.toDisplayDateTimeString();
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