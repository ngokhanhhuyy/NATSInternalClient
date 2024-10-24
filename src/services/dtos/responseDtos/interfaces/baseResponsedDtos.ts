declare global {
    interface IBasicResponseDto {
        id: number;
    }
    
    interface IListResponseDto {
        pageCount: number;
        items: IBasicResponseDto[] | null;
    }
}

export { };