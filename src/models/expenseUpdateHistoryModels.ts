import type { ExpenseUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { ExpenseCategory } from "@/services/dtos/enums";
import { Model } from "./baseModels";
import { UserBasicModel } from "./userModels";

export class ExpenseUpdateHistoryModel extends Model {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldAmount: number;
    public oldCategory: ExpenseCategory;
    public oldNote: string | null;
    public oldPayeeName: string;
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newAmount: number;
    public newCategory: ExpenseCategory;
    public newNote: string | null;
    public newPayeeName: string;

    constructor(responseDto: ExpenseUpdateHistoryResponseDto) {
        super();
        this.updatedDate = this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = this.convertToDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = this.convertToDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldCategory = responseDto.oldCategory;
        this.oldNote = responseDto.oldNote;
        this.oldPayeeName = responseDto.oldPayeeName;
        this.newPaidDate = this.convertToDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = this.convertToDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = this.convertToDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newAmount = responseDto.newAmount;
        this.newCategory = responseDto.newCategory;
        this.newNote = responseDto.newNote;
        this.newPayeeName = responseDto.newPayeeName;
    }
}