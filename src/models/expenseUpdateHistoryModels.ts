import type { ExpenseUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { ExpenseCategory } from "@/services/dtos/enums";
import { UserBasicModel } from "./userModels";
import { DateTimeDisplayModel } from "@/models/dateTimeModels";
import type { IFinancialEngageableUpdateHistoryModel } from "./interfaces";

export class ExpenseUpdateHistoryModel implements IFinancialEngageableUpdateHistoryModel {
    public updatedDateTime: DateTimeDisplayModel;
    public updatedUser: UserBasicModel;
    public updatedReason: string;
    public oldStatsDateTime: DateTimeDisplayModel;
    public oldAmount: number;
    public oldCategory: ExpenseCategory;
    public oldNote: string | null;
    public oldPayeeName: string;
    public newStatsDateTime: DateTimeDisplayModel;
    public newAmount: number;
    public newCategory: ExpenseCategory;
    public newNote: string | null;
    public newPayeeName: string;

    constructor(responseDto: ExpenseUpdateHistoryResponseDto) {
        this.updatedDateTime = new DateTimeDisplayModel(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.updatedReason = responseDto.reason;
        this.oldStatsDateTime = new DateTimeDisplayModel(responseDto.oldStatsDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldCategory = responseDto.oldCategory;
        this.oldNote = responseDto.oldNote;
        this.oldPayeeName = responseDto.oldPayeeName;
        this.newStatsDateTime = new DateTimeDisplayModel(responseDto.newStatsDateTime);
        this.newAmount = responseDto.newAmount;
        this.newCategory = responseDto.newCategory;
        this.newNote = responseDto.newNote;
        this.newPayeeName = responseDto.newPayeeName;
    }
}