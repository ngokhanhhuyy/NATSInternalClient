import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

const dateTimeUtility = useDateTimeUtility();

export class DateDisplayModel implements IDateDisplayModel {
    public readonly date: string;
    public readonly deltaText: string;

    constructor(date: string) {
        this.date = dateTimeUtility.getDisplayDateString(date);
        this.deltaText = dateTimeUtility.getDeltaTextRelativeToNow(date);
    }
}

export class TimeDisplayModel implements ITimeDisplayModel {
    public readonly time: string;
    public readonly deltaText: string;

    constructor(time: string) {
        this.time = dateTimeUtility.getDisplayTimeString(time);
        this.deltaText = dateTimeUtility.getDeltaTextRelativeToNow(time);
    }
}

export class DateTimeDisplayModel implements IDateTimeDisplayModel {
    public readonly date: string;
    public readonly time: string;
    public readonly dateTime: string;
    public readonly deltaText: string;

    constructor(dateTime: string) {
        this.date = dateTimeUtility.getDisplayDateString(dateTime);
        this.time = dateTimeUtility.getDisplayTimeString(dateTime);
        this.dateTime = dateTimeUtility.getDisplayDateTimeString(dateTime);
        this.deltaText = dateTimeUtility.getDeltaTextRelativeToNow(dateTime);
    }
}