import type { ConsultantUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { DateTimeDisplayModel } from "@/models/dateTimeModels";
import type { ICustomerEngageableUpdateHistoryModel } from "./interfaces";

export class ConsultantUpdateHistoryModel implements ICustomerEngageableUpdateHistoryModel {
    public updatedDateTime: DateTimeDisplayModel;
    public updatedUser: UserBasicModel;
    public updatedReason: string;
    public oldStatsDateTime: DateTimeDisplayModel;
    public oldAmount: number;
    public oldNote: string;
    public newStatsDateTime: DateTimeDisplayModel;
    public newAmount: number;
    public newNote: string;

    public constructor(responseDto: ConsultantUpdateHistoryResponseDto) {
        this.updatedDateTime = new DateTimeDisplayModel(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.updatedReason = responseDto.updatedReason;
        this.oldStatsDateTime = new DateTimeDisplayModel(responseDto.oldStatsDateTime);
        this.oldAmount = responseDto.oldAmountBeforeVat;
        this.oldNote = responseDto.oldNote;
        this.newStatsDateTime = new DateTimeDisplayModel(responseDto.newStatsDateTime);
        this.newAmount = responseDto.newAmountBeforeVat;
        this.newNote = responseDto.newNote;
    }
}