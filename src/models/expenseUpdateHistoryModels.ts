import type { ExpenseUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { ExpenseCategory } from "@/services/dtos/enums";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class ExpenseUpdateHistoryModel {
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
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldCategory = responseDto.oldCategory;
        this.oldNote = responseDto.oldNote;
        this.oldPayeeName = responseDto.oldPayeeName;
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newAmount = responseDto.newAmount;
        this.newCategory = responseDto.newCategory;
        this.newNote = responseDto.newNote;
        this.newPayeeName = responseDto.newPayeeName;
    }
}