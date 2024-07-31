import type {
    TreatmentItemUpdateHistoryDataDto,
    TreatmentUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class TreatmentUpdateHistoryModel {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
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
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
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