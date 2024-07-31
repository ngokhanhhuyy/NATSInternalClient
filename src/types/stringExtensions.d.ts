import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

const dateTimeUtil = useDateTimeUtility();

declare global {
    interface String {
        toDisplayDateTimeString();
        toDisplayDateString();
        toDisplayTimeString();
    }
}

String.prototype.toDisplayDateTimeString = function(this: string) {
    return dateTimeUtil.getDisplayDateTimeString(this);
};

String.prototype.toDisplayDateString = function(this: string) {
    return dateTimeUtil.getDisplayDateString(this);
};

String.prototype.toDisplayDateTimeString = function(this: string) {
    return dateTimeUtil.getDisplayTimeString(this);
} ;