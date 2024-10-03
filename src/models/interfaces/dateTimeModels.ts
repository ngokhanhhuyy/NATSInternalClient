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
}

export { };