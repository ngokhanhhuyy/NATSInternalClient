export interface IBasicResponseDto {
    id: number;
}

export interface IListResponseDto {
    pageCount: number;
    items: IBasicResponseDto[] | null;
}