declare global {
    namespace ResponseDtos {
        namespace Stats {
            type DailyBasic = Implements<IStatsBasicResponseDto, {
                cost: number;
                expenses: number;
                grossRevenue: number;
                netRevenue: number;
                netProfit: number;
                newCustomers: number;
                isTemporarilyClosed: boolean;
                isOfficialClosed: boolean;
                recordedDate: string;
            }>;

            type DailyDetail = Implements<IStatsDetailResponseDto, {
                retailGrossRevenue: number;
                treatmentGrossRevenue: number;
                consultantGrossRevenue: number;
                vatCollectedAmount: number;
                debtAmount: number;
                debtPaidAmount: number;
                shipmentCost: number;
                supplyCost: number;
                utilitiesExpenses: number;
                equipmentExpenses: number;
                officeExpense: number;
                staffExpense: number;
                cost: number;
                expenses: number;
                grossRevenue: number;
                netRevenue: number;
                grossProfit: number;
                netProfit: number;
                operatingProfit: number;
                newCustomers: number;
                temporarilyClosedDateTime: string | null;
                officialClosedDateTime: string | null;
                recordedDate: string;
            }>;

            type MonthlyBasic = Implements<IStatsBasicResponseDto, {
                cost: number;
                expenses: number;
                grossRevenue: number;
                netRevenue: number;
                netProfit: number;
                newCustomers: number;
                isTemporarilyClosed: boolean;
                isOfficialClosed: boolean;
                recordedMonth: number;
                recordedYear: number;
            }>;

            type MonthlyDetail = Implements<IStatsDetailResponseDto, {
                retailGrossRevenue: number;
                treatmentGrossRevenue: number;
                consultantGrossRevenue: number;
                vatCollectedAmount: number;
                debtAmount: number;
                debtPaidAmount: number;
                shipmentCost: number;
                supplyCost: number;
                utilitiesExpenses: number;
                equipmentExpenses: number;
                officeExpense: number;
                staffExpense: number;
                cost: number;
                expenses: number;
                grossRevenue: number;
                netRevenue: number;
                grossProfit: number;
                netProfit: number;
                operatingProfit: number;
                newCustomers: number;
                temporarilyClosedDateTime: string | null;
                officialClosedDateTime: string | null;
                recordedMonth: number;
                recordedYear: number;
                dailyStats: DailyBasic[];
            }>;
        }
    }
}

export { };