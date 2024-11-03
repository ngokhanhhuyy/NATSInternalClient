import { Gender } from "@enums";
declare global {
    interface CustomerListRequestDto extends ICreatorTrackableListRequestDto {
        orderByField?: string;
        orderByAscending?: boolean;
        searchByContent?: string;
        createdUserId?: number;
        page?: number;
        resultsPerPage?: number;
        hasRemainingDebtAmountOnly: boolean;
    }
    
    interface CustomerUpsertRequestDto {
        firstName: string | null;
        middleName: string | null;
        lastName: string | null;
        nickName: string | null;
        gender: Gender;
        birthday: string | null;
        phoneNumber: string | null;
        zaloNumber: string | null;
        facebookUrl: string | null;
        email: string | null;
        address: string | null;
        note: string | null;
        introducerId: number | null;
    }
}

export { };