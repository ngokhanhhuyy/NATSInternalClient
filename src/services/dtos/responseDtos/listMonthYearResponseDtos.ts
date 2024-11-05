declare global {
    type ListMonthYearResponseDto = InstanceType<typeof ResponseDtos.List.MonthYearOptions>;
    type ListMonthYearOptionsResponseDto = InstanceType<typeof ResponseDtos.List.MonthYearOptions>;

    namespace ResponseDtos {
        namespace List {
            class MonthYear {
                month: number;
                year: number;
            }

            class MonthYearOptions {
                options: MonthYear[] | null;
                default: MonthYear | null;
            }
        }
    }
}

export { };