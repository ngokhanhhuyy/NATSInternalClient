export class ListSortingByFieldModel {
    public name: string;
    public displayName: string;

    constructor(responseDto: ListSortingByFieldResponseDto) {
        this.name = responseDto.name;
        this.displayName = responseDto.displayName;
    }
}

export class ListSortingOptionsModel {
    public fieldOptions: ListSortingByFieldModel[];
    public defaultFieldName?: string;
    public defaultAscending: boolean;

    constructor(responseDto: ListSortingOptionsResponseDto) {
        this.fieldOptions = responseDto.fieldOptions
            ?.map(o => new ListSortingByFieldModel(o))
            ?? [];
        this.defaultFieldName = responseDto.defaultFieldName ?? undefined;
        this.defaultAscending = responseDto.defaultAscending;
    }
}