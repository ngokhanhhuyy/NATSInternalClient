declare global {
    interface IBasicResponseDto {
        id: number;
    }
    
    interface IListResponseDto<TBasic extends IBasicResponseDto> {
        pageCount: number;
        items: TBasic[];
    }
}

export { };