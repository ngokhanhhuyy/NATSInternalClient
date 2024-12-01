import { DateDisplayModel, DateTimeDisplayModel } from "./dateTimeModels";

export class DailyStatsBasicModel implements IStatsBasicModel {
    public readonly cost: number;
    public readonly expenses: number;
    public readonly grossRevenue: number;
    public readonly netRevenue: number;
    public readonly netProfit: number;
    public readonly newCustomers: number;
    public readonly isTemporarilyClosed: boolean;
    public readonly isOfficialClosed: boolean;
    public readonly recordedDate: IDateDisplayModel;

    constructor(responseDto: ResponseDtos.Stats.DailyBasic) {
        this.cost = responseDto.cost;
        this.expenses = responseDto.expenses;
        this.grossRevenue = responseDto.grossRevenue;
        this.netProfit = responseDto.netProfit;
        this.netRevenue = responseDto.netRevenue;
        this.newCustomers = responseDto.newCustomers;
        this.isTemporarilyClosed = responseDto.isTemporarilyClosed;
        this.isOfficialClosed = responseDto.isOfficialClosed;
        this.recordedDate = new DateDisplayModel(responseDto.recordedDate);
    }
}

export class DailyStatsDetailModel implements IStatsDetailModel {
    public readonly retailGrossRevenue: number;
    public readonly treatmentGrossRevenue: number;
    public readonly consultantGrossRevenue: number;
    public readonly vatCollectedAmount: number;
    public readonly debtAmount: number;
    public readonly debtPaidAmount: number;
    public readonly shipmentCost: number;
    public readonly supplyCost: number;
    public readonly utilitiesExpenses: number;
    public readonly equipmentExpenses: number;
    public readonly officeExpense: number;
    public readonly staffExpense: number;
    public readonly cost: number;
    public readonly expenses: number;
    public readonly grossRevenue: number;
    public readonly netRevenue: number;
    public readonly grossProfit: number;
    public readonly netProfit: number;
    public readonly operatingProfit: number;
    public readonly newCustomers: number;
    public readonly temporarilyClosedDateTime: IDateTimeDisplayModel | null;
    public readonly officialClosedDateTime: IDateTimeDisplayModel | null;
    public readonly recordedDate: IDateDisplayModel;

    constructor(responseDto: ResponseDtos.Stats.DailyDetail) {
        this.retailGrossRevenue = responseDto.retailGrossRevenue;
        this.treatmentGrossRevenue = responseDto.treatmentGrossRevenue;
        this.consultantGrossRevenue = responseDto.consultantGrossRevenue;
        this.vatCollectedAmount = responseDto.vatCollectedAmount;
        this.debtAmount = responseDto.debtAmount;
        this.debtPaidAmount = responseDto.debtPaidAmount;
        this.shipmentCost = responseDto.shipmentCost;
        this.supplyCost = responseDto.supplyCost;
        this.utilitiesExpenses = responseDto.utilitiesExpenses;
        this.equipmentExpenses = responseDto.equipmentExpenses;
        this.officeExpense = responseDto.officeExpense;
        this.staffExpense = responseDto.staffExpense;
        this.cost = responseDto.cost;
        this.expenses = responseDto.expenses;
        this.grossRevenue = responseDto.grossRevenue;
        this.netRevenue = responseDto.netRevenue;
        this.grossProfit = responseDto.grossProfit;
        this.netProfit = responseDto.netProfit;
        this.operatingProfit = responseDto.operatingProfit;
        this.newCustomers = responseDto.newCustomers;
        this.temporarilyClosedDateTime = responseDto.temporarilyClosedDateTime != null
            ? new DateTimeDisplayModel(responseDto.temporarilyClosedDateTime)
            : null;
        this.officialClosedDateTime = responseDto.officialClosedDateTime != null
            ? new DateTimeDisplayModel(responseDto.officialClosedDateTime)
            : null;
        this.recordedDate = new DateDisplayModel(responseDto.recordedDate);
    }
}

export class MonthlyStatsBasicModel implements IStatsBasicModel {
    public readonly cost: number;
    public readonly expenses: number;
    public readonly grossRevenue: number;
    public readonly netRevenue: number;
    public readonly netProfit: number;
    public readonly newCustomers: number;
    public readonly isTemporarilyClosed: boolean;
    public readonly isOfficialClosed: boolean;
    public readonly recordedMonth: number;
    public readonly recordedYear: number;

    constructor(responseDto: ResponseDtos.Stats.MonthlyBasic) {
        this.cost = responseDto.cost;
        this.expenses = responseDto.expenses;
        this.grossRevenue = responseDto.grossRevenue;
        this.netProfit = responseDto.netProfit;
        this.netRevenue = responseDto.netRevenue;
        this.newCustomers = responseDto.newCustomers;
        this.isTemporarilyClosed = responseDto.isTemporarilyClosed;
        this.isOfficialClosed = responseDto.isOfficialClosed;
        this.recordedMonth = responseDto.recordedMonth;
        this.recordedYear = responseDto.recordedYear;
    }
}

export class MonthlyStatsDetailModel implements IStatsDetailModel {
    public readonly retailGrossRevenue: number;
    public readonly treatmentGrossRevenue: number;
    public readonly consultantGrossRevenue: number;
    public readonly vatCollectedAmount: number;
    public readonly debtAmount: number;
    public readonly debtPaidAmount: number;
    public readonly shipmentCost: number;
    public readonly supplyCost: number;
    public readonly utilitiesExpenses: number;
    public readonly equipmentExpenses: number;
    public readonly officeExpense: number;
    public readonly staffExpense: number;
    public readonly cost: number;
    public readonly expenses: number;
    public readonly grossRevenue: number;
    public readonly netRevenue: number;
    public readonly grossProfit: number;
    public readonly netProfit: number;
    public readonly operatingProfit: number;
    public readonly newCustomers: number;
    public readonly temporarilyClosedDateTime: IDateTimeDisplayModel | null;
    public readonly officialClosedDateTime: IDateTimeDisplayModel | null;
    public readonly recordedMonth: number;
    public readonly recordedYear: number;

    constructor(responseDto: ResponseDtos.Stats.MonthlyDetail) {
        this.retailGrossRevenue = responseDto.retailGrossRevenue;
        this.treatmentGrossRevenue = responseDto.treatmentGrossRevenue;
        this.consultantGrossRevenue = responseDto.consultantGrossRevenue;
        this.vatCollectedAmount = responseDto.vatCollectedAmount;
        this.debtAmount = responseDto.debtAmount;
        this.debtPaidAmount = responseDto.debtPaidAmount;
        this.shipmentCost = responseDto.shipmentCost;
        this.supplyCost = responseDto.supplyCost;
        this.utilitiesExpenses = responseDto.utilitiesExpenses;
        this.equipmentExpenses = responseDto.equipmentExpenses;
        this.officeExpense = responseDto.officeExpense;
        this.staffExpense = responseDto.staffExpense;
        this.cost = responseDto.cost;
        this.expenses = responseDto.expenses;
        this.grossRevenue = responseDto.grossRevenue;
        this.netRevenue = responseDto.netRevenue;
        this.grossProfit = responseDto.grossProfit;
        this.netProfit = responseDto.netProfit;
        this.operatingProfit = responseDto.operatingProfit;
        this.newCustomers = responseDto.newCustomers;
        this.temporarilyClosedDateTime = responseDto.temporarilyClosedDateTime != null
            ? new DateTimeDisplayModel(responseDto.temporarilyClosedDateTime)
            : null;
        this.officialClosedDateTime = responseDto.officialClosedDateTime != null
            ? new DateTimeDisplayModel(responseDto.officialClosedDateTime)
            : null;
        this.recordedMonth = responseDto.recordedMonth;
        this.recordedYear = responseDto.recordedYear;
    }
}