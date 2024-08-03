import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

const dateTimeUtil = useDateTimeUtility();

declare global {
    interface DateISOString extends String {
        /**
         * Convert to a Date string which is used for displaying.
         * @returns A formatted Date string used for displaying.
         * @example "1997-08-30" => "30 tháng 8, 1997"
         */
        toDisplayDateString(): string;

        /**
         * Convert to a formatted string of type `HTMLDateInputString`. This string can be used
         * as value for `HTMLInputElement` which type is `date`.
         * @returns A formatted string of type `HTMLDateInputString`.
         * @example "1997-08-30" => "1997-08-30"
         */
        toHTMLDateInputString(): HTMLDateInputString;
    }

    interface TimeISOString extends String {
        /**
         * Convert to a Time string which is used for displaying.
         * @returns A formatted Time string used for displaying.
         * @example "21:00:00" => "21g00"
         */
        toDisplayTimeString(): string;

        /**
         * Convert to a formatted string of type `HTMLTimeInputString`. This string can be used
         * as value for `HTMLInputElement` which type is `time`.
         * @returns A formatted string of type `HTMLTimeInputString`.
         * @example "21:00:00" => "21:00"
         */
        toHTMLTimeInputString(): HTMLTimeInputString;
    }

    interface DateTimeISOString extends String {
        /**
         * Convert to a `DisplayDateTimeString` which is used for displaying.
         * @returns A `DisplayDateTime` string used for displaying.
         * @example "1997-08-30T21:00:00" => "21g00, 30 tháng 8, 1997"
         */
        toDisplayDateTimeString(): DisplayDateTimeString;

        /**
         * Convert to a `DisplayDateString` which is used for displaying.
         * @returns A `DisplayDateString` used for displaying.
         * @example "1997-08-30T21:00:00" => "30 tháng 8, 1997"
         */
        toDisplayDateString(): DisplayDateString;

        /**
         * Convert to a `DisplayTimeString` which is used for displaying.
         * @returns A `DisplayTimeString` used for displaying.
         * @example "1997-08-30T21:00:00" => "21g00"
         */
        toDisplayTimeString(): DisplayTimeString;

        /**
         * Convert to a formatted string of type `HTMLDateTimeInputString`. This string can be used
         * as value for `HTMLDateTimeInputString` which type is `local-datetime`.
         * @returns A formatted string of type `HTMLDateTimeInputString`.
         * @example "1997-08-30T21:00:00" => "1997-08-30T21:00"
         */
        toHTMLDateTimeInputString(): HTMLDateTimeInputString;

        /**
         * Convert to a formatted string of type `HTMLDateInputString`. This string can be used
         * as value for `HTMLInputElement` which type is `date`.
         * @returns A formatted string of type `HTMLDateInputString`.
         * @example "1997-08-30T21:00:00" => "1997-08-30"
         */
        toHTMLDateInputString(): HTMLDateInputString;

        /**
         * Convert to a formatted string of type `HTMLTimeInputString`. This string can be used
         * as value for `HTMLInputElement` which type is `time`.
         * @returns A formatted string of type `HTMLTimeInputString`.
         * @example "1997-08-30T21:00:00" => "21:00"
         */
        toHTMLTimeInputString(): HTMLTimeInputString;
    }

    interface HTMLDateTimeInputString extends String {
        /**
         * Convert to a DateTime string in ISO format to communicate with the server.
         * @returns An ISO string as data for request DTOs.
         * @example "1997-08-30T21:00" => "1997-08-30T21:00:00"
         */
        toRequestDtoDateTimeString(): DateTimeISOString;
    }

    interface HTMLDateInputString extends String {
        /**
         * Convert to a Date string in ISO format to comminicate with the server.
         * @returns An ISO string as data for request DTOs.
         * @example "1997-08-30" => "1997-08-30"
         */
        toRequestDtoDateString(): DateISOString;
    }

    interface HTMLTimeInputString extends String {
        /**
         * Convert to a Time string in ISO format to comminicate with the server.
         * @returns An ISO string as data for request DTOs.
         * @example "19:00" => "19:00:00"
         */
        toRequestDtoTimeString(): TimeISOString;
    }

    interface EmptyString extends "" {
        /**
         * Convert to an empty string under `DateISOString` type.
         * @returns An empty string which type is `DateISOString`.
         */
        toRequestDtoDateString(): DateISOString;

        /**
         * Convert to an empty string under `TimeISOString` type.
         * @returns An empty string which type is `TimeISOString`.
         */
        toRequestDtoTimeString(): TimeISOString;
        
        /**
         * Convert to an empty string under `DateTimeISOString` type.
         * @returns An empty string which type is `DateTimeISOString`.
         */
        toRequestDtoDateTimeString(): DateTimeISOString;
    }

    interface DisplayDateTimeString extends String {}

    interface DisplayDateString extends String {}

    interface DisplayTimeString extends String {}

    interface HTMLImageUrl extends String {}

    interface ImageBase64String extends string {}
}

String.prototype.toDisplayDateTimeString = function(this: DateTimeISOString): DisplayDateTimeString {
    return dateTimeUtil.getDisplayDateTimeString(this);
};

String.prototype.toDisplayDateString = function(this: DateTimeISOString | DateISOString): DisplayDateString {
    return dateTimeUtil.getDisplayDateString(this);
};

String.prototype.toDisplayDateTimeString = function(this: DateTimeISOString | TimeISOString): DisplayTimeString {
    return dateTimeUtil.getDisplayTimeString(this);
};

String.prototype.toHTMLDateTimeInputElementString = function(this: DateTimeISOString): HTMLDateTimeInputString {
    return dateTimeUtil.getDateTimeHTMLInputElementString(this);
};

String.prototype.toHTMLDateInputElementString = function(this: DateTimeISOString | DateISOString): HTMLDateInputString {
    return dateTimeUtil.getDateHTMLInputElementString(this);
};

String.prototype.toHTMLTimeInputElementString = function(this: DateTimeISOString | TimeISOString): HTMLTimeInputString {
    return dateTimeUtil.getTimeHTMLInputElementString(this);
};

String.prototype.toRequestDtoDateTimeString = function(this: HTMLDateTimeInputString | EmptyString): DateTimeISOString {
    return dateTimeUtil.getRequestDtoDateTimeString(this);
};

String.prototype.toRequestDtoDateString = function(this: HTMLDateInputString | EmptyString): DateISOString {
    return dateTimeUtil.getRequestDtoDateString(this);
};

String.prototype.toRequestDtoTimeString = function(this: HTMLTimeInputString | EmptyString): TimeISOString {
    return dateTimeUtil.getRequestDtoTimeString(this);
};