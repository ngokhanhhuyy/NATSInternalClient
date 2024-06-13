export function useDateTimeUtility() {
    function toDisplayDate(value: Date | string | null, separator: string = "-") {
        if (value == null || (typeof value === "string" && !value.length)) {
            return null;
        }

        let date: Date;
        if (typeof value === "string") {
            date = new Date(value);
        } else {
            date = value;
        }

        const values = [
            date.getDate().toString().padStart(2, "0"),
            (date.getMonth() + 1).toString().padStart(2, "0"),
            date.getFullYear().toString().padStart(4, "0")
        ]
        return values.join(separator);
    }

    function toDisplayDateTime(
            value: Date | string | null,
            dateSeparator?: string,
            timeSeparator?: string,
            includesSeconds?: boolean) {
        if (value == null) {
            return null;
        }

        if (!dateSeparator) {
            dateSeparator = "-";
        }
        
        if (!timeSeparator) {
            timeSeparator = ":";
        }

        let date: Date;
        if (typeof value === "string") {
            date = new Date(value);
        } else {
            date = value;
        }

        const dateValues = [
            date.getDate().toString().padStart(2, "0"),
            (date.getMonth() + 1).toString().padStart(2, "0"),
            date.getFullYear().toString().padStart(4, "0")
        ];
        const timeValues = [
            date.getHours().toString().padStart(2, "0"),
            date.getMinutes().toString().padStart(2, "0"),
        ]
        if (includesSeconds === true) {
            timeValues.push(date.getSeconds().toString().padStart(2, "0"));
        }
        
        return dateValues.join(dateSeparator) + " " + timeValues.join(timeSeparator);
    }

    function toDateISOString(value: Date | string | null): string | null {
        if (value instanceof Date) {
            return value.toISOString().split("T")[0];
        }
        
        if (typeof(value) === "string" && value.length) {
            return new Date(value).toISOString().split("T")[0];
        }

        return null;
    }

    function toTimeISOString(value: Date | string | null): string | null {
        if (value instanceof Date) {
            return value.toISOString().split("T")[1];
        }
        
        if (typeof(value) === "string" && value.length) {
            return new Date(value).toISOString().split("T")[1];
        }

        return null;
    }

    function toDateTimeISOString(value: Date | string | null): string | null {
        if (value instanceof Date) {
            const isoString = value.toISOString();
            return isoString.slice(0, isoString.length - 5);
        }
        
        if (typeof(value) === "string" && value.length) {
            const isoString = new Date(value).toISOString();
            return isoString.slice(0, isoString.length - 5);
        }

        return null;
    }

    return {
        toDisplayDate,
        toDisplayDateTime,
        toDateISOString,
        toTimeISOString,
        toDateTimeISOString
    };
}