import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

const dateTimeUtility = useDateTimeUtility();

export class DateDisplayModel implements IDateDisplayModel {
    public readonly date: string;

    constructor(date: string) {
        this.date = dateTimeUtility.getDisplayDateString(date);
    }

    public toString(): string {
        return this.date;
    }
}

export class TimeDisplayModel implements ITimeDisplayModel {
    public readonly time: string;
    public readonly deltaText: string;

    constructor(time: string) {
        this.time = dateTimeUtility.getDisplayTimeString(time);
        this.deltaText = dateTimeUtility.getDeltaTextRelativeToNow(time);
    }

    public toString(): string {
        return this.time;
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

export class DateInputModel implements IDateInputModel {
    private value: string = "";

    constructor(value?: string) {
        if (value) {
            this.value = dateTimeUtility.getHTMLDateInputString(value);
        }
    }
    
    public get inputDate(): string {
        return this.value;
    }

    public set inputDate(value: string) {
        this.value = dateTimeUtility.getHTMLDateInputString(value);
    }

    public get displayText(): string | null {
        if (!this.value) {
            return null;
        }

        const isoDate = dateTimeUtility.getDateISOString(this.value);
        return dateTimeUtility.getDisplayDateString(isoDate);
    }
}

export class TimeInputModel implements ITimeInputModel {
    private value: string = "";

    constructor(value?: string) {
        if (value) {
            this.value = dateTimeUtility.getHTMLDateInputString(value);
        }
    }
    
    public get inputTime(): string {
        return this.value;
    }

    public set inputTime(value: string) {
        this.value = dateTimeUtility.getHTMLDateInputString(value);
    }

    public get displayText(): string | null {
        if (!this.value) {
            return null;
        }

        const isoTime = dateTimeUtility.getTimeISOString(this.value);
        return dateTimeUtility.getDisplayTimeString(isoTime);
    }
}

export class DateTimeInputModel implements IDateTimeInputModel {
    private value: string = "";
    
    constructor(value?: string) {
        if (value) {
            this.value = dateTimeUtility.getHTMLDateTimeInputString(value);
        }
    }

    public get inputDateTime(): string {
        return this.value;
    }

    public set inputDateTime(value: string) {
        this.value = dateTimeUtility.getHTMLDateTimeInputString(value);
    }

    public get displayText(): string | null {
        return this.isoDateTime && dateTimeUtility.getDisplayDateTimeString(this.isoDateTime);
    }

    public get dateDisplayText(): string | null {
        return this.isoDateTime && dateTimeUtility.getDisplayDateString(this.isoDateTime);
    }

    public get timeDisplayText(): string | null {
        return this.isoDateTime && dateTimeUtility.getDisplayTimeString(this.isoDateTime);
    }

    private get isoDateTime(): string | null {
        return dateTimeUtility.getDateTimeISOString(this.value);
    }

    public toRequestDto(): string | null {
        return this.isoDateTime && dateTimeUtility.getDateTimeISOString(this.isoDateTime);
    }
}