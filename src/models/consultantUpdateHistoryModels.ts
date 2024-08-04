import type { ConsultantUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { UserBasicModel } from "./userModels";

export class ConsultantUpdateHistoryModel extends Model {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldAmount: number;
    public oldNote: string;
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newAmount: number;
    public newNote: string;

    public constructor(responseDto: ConsultantUpdateHistoryResponseDto) {
        super();
        this.updatedDate = this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = this.convertToDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = this.convertToDisplayTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newPaidDate = this.convertToDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = this.convertToDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = this.convertToDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}