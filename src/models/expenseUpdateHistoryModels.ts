import type { ExpenseUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { ExpenseCategory } from "@/services/dtos/enums";
import { UserBasicModel } from "./userModels";

export class ExpenseUpdateHistoryModel {
    public updatedDate: DisplayDateString;
    public updatedTime: DisplayTimeString;
    public updatedDateTime: DisplayDateTimeString;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: DisplayDateString;
    public oldPaidTime: DisplayTimeString;
    public oldPaidDateTime: DisplayDateTimeString;
    public oldAmount: number;
    public oldCategory: ExpenseCategory;
    public oldNote: string | null;
    public oldPayeeName: string;
    public newPaidDate: DisplayDateString;
    public newPaidTime: DisplayTimeString;
    public newPaidDateTime: DisplayDateTimeString;
    public newAmount: number;
    public newCategory: ExpenseCategory;
    public newNote: string | null;
    public newPayeeName: string;

    constructor(responseDto: ExpenseUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = responseDto.oldPaidDateTime.toDisplayDateString();
        this.oldPaidTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldPaidDateTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldAmount = responseDto.oldAmount;
        this.oldCategory = responseDto.oldCategory;
        this.oldNote = responseDto.oldNote;
        this.oldPayeeName = responseDto.oldPayeeName;
        this.newPaidDate = responseDto.newPaidDateTime.toDisplayDateString();
        this.newPaidTime = responseDto.newPaidDateTime.toDisplayTimeString();
        this.newPaidDateTime = responseDto.newPaidDateTime.toDisplayDateTimeString();
        this.newAmount = responseDto.newAmount;
        this.newCategory = responseDto.newCategory;
        this.newNote = responseDto.newNote;
        this.newPayeeName = responseDto.newPayeeName;
    }
}