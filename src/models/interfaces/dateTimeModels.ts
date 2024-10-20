declare global {
    interface IDateDisplayModel {
        readonly date: string;
        readonly deltaText: string;
    }

    interface ITimeDisplayModel {
        readonly time: string;
        readonly deltaText: string;
    }

    interface IDateTimeDisplayModel extends IDateDisplayModel, ITimeDisplayModel { }

    interface IDateInputModel {
        inputDate: string;
        readonly displayText: string | null;
    }

    interface ITimeInputModel {
        inputTime: string;
        readonly displayText: string | null;
    }

    interface IDateTimeInputModel {
        inputDateTime: string;
        readonly dateDisplayText: string | null;
        readonly timeDisplayText: string | null;
        readonly displayText: string | null;
        toRequestDto(): string | null;
    }
}

export { };