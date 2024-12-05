declare global {
    interface IDateDisplayModel {
        readonly date: string;
    }

    interface ITimeDisplayModel {
        readonly time: string;
    }

    interface IDateTimeDisplayModel extends IDateDisplayModel, ITimeDisplayModel {
        readonly deltaText: string;
    }

    interface IDateInputModel {
        inputDate: string;
        readonly displayText: string | null;
        toRequestDto(): string | null;
    }

    interface ITimeInputModel {
        inputTime: string;
        readonly displayText: string | null;
        toRequestDto(): string | null;
    }

    interface IDateTimeInputModel {
        inputDateTime: string;
        readonly dateDisplayText: string | null;
        readonly timeDisplayText: string | null;
        readonly displayText: string | null;
        toRequestDto(): string | null;
    }

    interface IStatsDateTimeInputModel extends IDateTimeInputModel {
        isSpecified: boolean;
        readonly isForCreating: boolean;
        readonly initialDisplayText: string;
    }
}

export { };