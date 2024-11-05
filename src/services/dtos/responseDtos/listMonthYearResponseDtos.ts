declare global {
    namespace ResponseDtos {
        namespace List {
            type MonthYear = {
                month: number;
                year: number;
            }

            type MonthYearOptions = {
                options: MonthYear[] | null;
                default: MonthYear | null;
            }
        }
    }
}

export { };