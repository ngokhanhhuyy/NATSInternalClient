export class ListMonthYearModel {
    public month: number;
    public year: number;

    constructor(responseDto: ListMonthYearResponseDto);
    constructor(year: number, month: number)
    constructor(arg: number | ListMonthYearResponseDto, month?: number) {
        if (typeof arg === "number") {
            this.year = arg;
            this.month = month!;
        } else {
            this.month = arg.month;
            this.year = arg.year;
        }
    }

    public toRequestDto(): ListMonthYearRequestDto {
        return {
            year: this.year,
            month: this.month
        };
    }
}

export class ListMonthYearOptionsModel {
    public options: ListMonthYearModel[];
    public default: ListMonthYearModel | null;

    constructor(responseDto: ListMonthYearOptionsResponseDto) {
        this.options = responseDto.options?.map(option => new ListMonthYearModel(option))
            ?? [];
        this.default = responseDto.default && new ListMonthYearModel(responseDto.default);
    }
}