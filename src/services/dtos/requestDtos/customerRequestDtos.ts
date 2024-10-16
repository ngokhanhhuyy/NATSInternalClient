import { Gender } from "@/services/dtos/enums";

export type CustomerListOrderField = "FirstName" | "LastName" | "Birthday" | "CreatedDateTime"
    | "DebtRemainingAmount";

export interface CustomerListRequestDto {
    orderByField: CustomerListOrderField;
    orderByAscending: boolean;
    searchByContent: string | null;
    createdUserId: number | null;
    page: number;
    resultsPerPage: number;
    hasRemainingDebtAmountOnly: boolean;
}

export interface CustomerUpsertRequestDto {
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