export function useDateTimeUtility() {
    /**
     * Convert datetime string extracted from local-datetime HTMLInputElement
     * to ISO 8601 format string (ICT timezone) to be used as data for request DTOs.
     * @param value String value extracted from datetime-local HTMLInputElement.
     * @returns An ISO string as data for request DTOs.
     * @example "1997-08-30T21:00" => "1997-08-30T21:00:00"
     */
    function getRequestDtoDateTimeString(dateTimeInputValue: string): string {
        return dateTimeInputValue;
    }

    /**
     * Convert date string extracted from date HTMLInputElement to ISO 8601 format
     * string to be used as data for request DTOs.
     * @param value String value extracted from date HTMLInputElement.
     * @returns An ISO string as data for request DTOs.
     * @example "1997-08-30" => "1997-08-30"
     */
    function getRequestDtoDateString(dateInputValue: string): string {
        return dateInputValue;
    }

    /**
     * Convert time string extracted from time HTMLInputElement to ISO 8601 format
     * string to be used as data for request DTOs.
     * @param value String value extracted from date HTMLInputElement.
     * @returns An ISO string as data for request DTOs.
     * @example "21:00" => "21:00:00"
     */
    function getRequestDtoTimeString(timeInputValue: string): string {
        return timeInputValue;
    }

    /**
     * Convert datetime ISO string retrieved from the server to the format that is used
     * as local-datetime HTMLInputElement value. If the value is null, the result
     * will be an empty string.
     * @param value An datetime ISO string retrived from the server.
     * @returns A string used as HTMLInputElement value.
     * @example
     * "1997-08-30T21:00:00" => "1997-08-30T21:00"
     * null => ""
     */
    function getDateTimeHTMLInputElementString(responseDtoValue: string | null): string {
        if (responseDtoValue) {
            return removeMilliSecondsAndTimeZone(responseDtoValue);
        }
        return "";
    }

    /**
     * Generate a string which represents the current datetime as value for local-datetime
     * HTMLInputElement.
     * @returns A string representing the current datetime as value for HTMLInputElement.
     */
    function getCurrentDateTimeHTMLInputElementString(): string {
        const date = new Date();
        date.setMilliseconds(7 * 3_600_000);
        return removeMilliSecondsAndTimeZone(date.toISOString());
    }

    /**
     * Convert date ISO string retrieved from the server to the format that is used
     * as date HTMLInputElement value. If the value is null, the result will be
     * an empty string.
     * @param value A date ISO string retrived from the server.
     * @returns A string used as date HTMLInputElement value.
     * @example "1997-08-30" => "1997-08-30"
     */
    function getDateHTMLInputElementString(responseDtoValue: string | null): string {
        return responseDtoValue ?? "";
    }

    /**
     * Generate a string which represents today as value for date HTMLInputElement.
     * @returns A string representing the today as value for date HTMLInputElement.
     */
    function getCurrentDateHTMLInputElementString(): string {
        const date = new Date();
        date.setMilliseconds(7 * 3_600_000);
        return date.toISOString().split("T")[0];
    }

    /**
     * Convert time ISO string retrieved from the server to the format that is used
     * as time HTMLInputElement value. If the value is null, the result will be
     * an empty string.
     * @param value A time ISO string retrived from the server.
     * @returns A string used as time HTMLInputElement value.
     * @example "21:00" => 21:00"
     */
    function getTimeHTMLInputElementString(responseDtoValue: string | null): string {
        return responseDtoValue ?? "";
    }

    /**
     * Generate a string which represents the current time as value for time HTMLInputElement.
     * @returns A string representing the current time as value for time HTMLInputElement.
     */
    function getCurrentTimeHTMLInputElementString(): string {
        const date = new Date();
        date.setMilliseconds(7 * 3_600_000);
        return removeMilliSecondsAndTimeZone(date.toISOString()).split("T")[1];
    }

    /**
     * Convert datetime ISO string in response DTOs retrieved from server to a string
     * used for dislaying.
     * @param value An ISO string retrieved server datetime.
     * @returns A formatted datetime string used for displaying.
     * @example "1997-08-30T21:00:00" => "21:00 30-08-1997"
     */
    function getDisplayDateTimeString(responseDtoValue: string): string {
        const date = new Date(responseDtoValue);
        const [day, month, year] = [
            date.getDate().toString().padStart(2, "0"),
            (date.getMonth() + 1).toString(),
            date.getFullYear().toString().padStart(4, "0")
        ];
        const timeValues = [
            date.getHours().toString().padStart(2, "0"),
            date.getMinutes().toString().padStart(2, "0"),
        ];
        
        return `${timeValues.join("g")}, ngày ${day} tháng ${month}, ${year}`;
    }

    /**
     * Convert a time ISO String retrieved from the server into a string used for displaying.
     * @param responseDtoValue A time ISO string in response DTOs retrieved from server.
     * @returns A formatted time string used for displaying.
     * @example "21:00:00" => "21:00"
     */
    function getDisplayTimeString(responseDtoValue: string): string {
        const date = new Date(responseDtoValue);
        return date.getHours().toString().padStart(2, "0") +
            "g" + date.getMinutes().toString().padStart(2, "0");
    }

    /**
     * Convert a date ISO String retrieved from the server into a string used for displaying.
     * @param responseDtoValue A date ISO string in response DTOs retrieved from server.
     * @returns A date string for displaying.
     * @example "1997-08-30" => "30-08-1997"
     */
    function getDisplayDateString(responseDtoValue: string): string {
        const date = new Date(responseDtoValue);
        const [day, month, year] = [
            date.getDate().toString().padStart(2, "0"),
            (date.getMonth() + 1).toString(),
            date.getFullYear().toString().padStart(4, "0")
        ];
        return `Ngày ${day} tháng ${month}, ${year}`;
    }

    /**
     * Remove milliseconds and timezone parts in the string extracted from HTMLInputElement.
     * @param value The string extracted from local-datetime HTMInputElement.
     * @returns An ISO string representing local datetime.
     * @example
     * RemoveMilliSecondsAndTimeZone("1997-08-30T21:00:00.710Z")
     * => "1997-08-30T21:00:00"
     */
    function removeMilliSecondsAndTimeZone(value: string): string {

        const splittedISOString = value.split("T");
        const dateISOString = splittedISOString[0];
        const timeISOString = splittedISOString[1].split(".")[0];
        return [dateISOString, timeISOString].join("T");
    }

    return {
        getRequestDtoDateTimeString,
        getRequestDtoDateString,
        getRequestDtoTimeString,
        getDateTimeHTMLInputElementString,
        getCurrentDateTimeHTMLInputElementString,
        getDateHTMLInputElementString,
        getCurrentDateHTMLInputElementString,
        getTimeHTMLInputElementString,
        getCurrentTimeHTMLInputElementString,
        getDisplayDateTimeString,
        getDisplayDateString,
        getDisplayTimeString
    };
}