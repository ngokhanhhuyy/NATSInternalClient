import type { UserBasicModel } from "../userModels";

declare global {
    interface IUpdateHistoryModel {
        updatedDateTime: IDateTimeDisplayModel
        updatedUser: UserBasicModel
        updatedReason: string | null;
    }
}

export { };