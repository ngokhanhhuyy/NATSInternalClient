declare global {
    interface ListSortingOptionsResponseDto {
        fieldOptions: ListSortingByFieldResponseDto[] | null;
        defaultFieldName: string | null;
        defaultAscending: boolean;
    }

    interface ListSortingByFieldResponseDto {
        name: string;
        displayName: string;
    }
}

export { };