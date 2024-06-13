import { Gender } from "@/services/dtos/enums";

export interface CustomerBasicResponseDto {
    id: number;
    fullName: string;
    nickName: string | null;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
}

export interface CustomerListResponseDto {
    pageCount: number;
    results: CustomerBasicResponseDto[] | null;
}

export interface CustomerDetailResponseDto {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    fullName: string;
    nickName: string | null;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
    zaloNumber: string | null;
    facebookUrl: string | null;
    email: string | null;
    address: string | null;
    note: string | null;
    createdDateTime: string;
    updatedDateTime: string | null;
    introducer: CustomerBasicResponseDto | null;
}

export interface CustomerCreateResponseDto {
    id: number;
}