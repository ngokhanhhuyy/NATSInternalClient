declare global {
    interface ListMonthYearResponseDto {
        month: number;
        year: number;
    }

    interface ListMonthYearOptionsResponseDto {
        options: ListMonthYearResponseDto[] | null;
        default: ListMonthYearResponseDto | null;
    }
}

export { };