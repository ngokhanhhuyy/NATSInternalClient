import type {
    IListRequestDto,
    IOrderableListRequestDto } from "@/services/dtos/requestDtos/interfaces";
import type { IListResponseDto } from "@/services/dtos/responseDtos/interfaces";

export interface IListModel {
    page: number;
    resultsPerPage: number;
    pageCount: number;
    items: IBasicModel[];
    mapFromResponseDto(responseDto: IListResponseDto): void;
    toRequestDto(): IListRequestDto;
}

export interface IOrderableListModel extends IListModel {
    orderByAscending: boolean;
    orderByField: string;
    toRequestDto(): IOrderableListRequestDto;
}

export interface IBasicModel {
    readonly id: number;
}

export interface IUpsertModel {
    toRequestDto(): any;
}