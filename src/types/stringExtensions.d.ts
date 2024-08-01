import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

const dateTimeUtil = useDateTimeUtility();

declare global {
    interface DateISOString {
        /**
         * Convert to a Date string which is used for displaying.
         * @returns A formatted Date string used for displaying.
         * @example "1997-08-30T21:00:00" => "30 tháng 8, 1997"
         */
        toDisplayDateString(): string;
    }

    interface DateTimeISOString extends DateISOString {
        /**
         * Convert to a DateTime string which is used for displaying.
         * @returns A formatted datetime string used for displaying.
         * @example "1997-08-30T21:00:00" => "21g00, 30 tháng 8, 1997"
         */
        toDisplayDateTimeString(): string;

        /**
         * Convert to a Time string which is used for displaying.
         * @returns A formatted Time string used for displaying.
         * @example "1997-08-30T21:00:00" => "21g00"
         */
        toDisplayTimeString(): string;
    }
}

String.prototype.toDisplayDateTimeString = function(this: string): string {
    return dateTimeUtil.getDisplayDateTimeString(this);
};

String.prototype.toDisplayDateString = function(this: string): string {
    return dateTimeUtil.getDisplayDateString(this);
};

String.prototype.toDisplayDateTimeString = function(this: string): string {
    return dateTimeUtil.getDisplayTimeString(this);
};

String.prototype.toHTMLDateTimeInputElementString = function(this: string): string {
    return dateTimeUtil.getDateTimeHTMLInputElementString(this);
};

String.prototype.toHTMLDateInputElementString = function(this: string): string {
    return dateTimeUtil.getDateHTMLInputElementString(this);
};

String.prototype.toHTMLTimeInputElementString = function(this: string): string {
    return dateTimeUtil.getTimeHTMLInputElementString(this);
};