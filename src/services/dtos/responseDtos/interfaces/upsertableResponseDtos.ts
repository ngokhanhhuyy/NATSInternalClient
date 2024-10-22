import type { IBasicResponseDto, IListResponseDto } from "./baseResponsedDtos";

export interface IUpsertableBasicResponseDto extends IBasicResponseDto {
    authorization: IUpsertableAuthorizationResponseDto | null;
}

export interface IUpsertableListResponseDto extends IListResponseDto {
    items: IUpsertableBasicResponseDto[] | null;
    authorization: IUpsertableListAuthorizationResponseDto | null;
}

export interface IUpsertableDetailResponseDto extends IUpsertableBasicResponseDto {
    createdDateTime: string; 
}

export interface IUpsertableListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface IUpsertableAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}