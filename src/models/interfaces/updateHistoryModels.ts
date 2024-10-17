import type {DateTimeDisplayModel} from "../dateTimeModels";
import {UserBasicModel} from "../userModels";

export interface IUpdateHistoryModel {
    updatedDateTime: DateTimeDisplayModel
    updatedUser: UserBasicModel
    updatedReason: string | null;
}