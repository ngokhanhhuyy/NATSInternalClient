import type { MonthYearResponseDto } from "@/services/dtos/responseDtos";

export class MonthYearModel {
    public month: number;
    public year: number;

    constructor(responseDto: MonthYearResponseDto);
    constructor(year: number, month: number)
    constructor(arg: number | MonthYearResponseDto, month?: number) {
        if (typeof arg === "number") {
            this.year = arg;
            this.month = month!;
        } else {
            this.month = arg.month;
            this.year = arg.year;
        }
    }
}