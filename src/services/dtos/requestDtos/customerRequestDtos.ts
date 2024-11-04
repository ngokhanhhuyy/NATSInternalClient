import { Gender } from "@enums";
declare global {
    class CustomerListRequestDto implements ICreatorTrackableListRequestDto {
        sortByField?: string;
        sortByAscending?: boolean;
        searchByContent?: string;
        createdUserId?: number;
        page?: number;
        resultsPerPage?: number;
        hasRemainingDebtAmountOnly?: boolean;
    }
    
    class CustomerUpsertRequestDto {
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