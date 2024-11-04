declare global {
    interface IListRequestDto {
        page?: number;
        resultsPerPage?: number;
    }
    
    interface ISortableListRequestDto extends IListRequestDto {
        sortByAscending?: boolean;
        sortByField?: string;
    }

    function createRequestDto<T extends object>(
        requestDtoType: abstract new() => T,
        arg: T): T;
}

globalThis.createRequestDto = <T extends object>(
        requestDtoType: abstract new() => T,
        arg: T): T => {
    const requestDtoConstructor = requestDtoType as (new() => T);
    const requestDto = new requestDtoConstructor();
    Object.assign(requestDto, arg);
    return requestDto;
};

export { };