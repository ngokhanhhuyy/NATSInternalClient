import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { useAvatarUtility } from "@/utilities/avatarUtility";
import { usePhotoUtility } from "@/utilities/photoUtility";

export class Model {
    private static readonly dateTimeUtil = useDateTimeUtility();
    private static readonly avatarUtil = useAvatarUtility();
    private static readonly photoUtil = usePhotoUtility();

    /**
     * Convert a string representing Date or DateTime in ISO format to a
     * string representing Date in the format for displaying.
     * @param value A string representing Date or DateTime in ISO format.
     * @returns A string representing Date in displaying format.
     * @example "1997-08-30T21:00:00" => "30 tháng 8, 1997"
     * @example "1997-08-30" => "30 tháng 8, 1997"
     */
    protected convertToDisplayDateString(value: string): string {
        return Model.dateTimeUtil.getDisplayDateString(value);
    }

    /**
     * Convert a string representing Time or DateTime in ISO format to a
     * a string representing Time in the format for displaying.
     * @param value A string representing Time or DateTime in ISO format.
     * @returns A string presenting Time in displaying format.
     * @example "1997-08-30T21:00:00" => "21g00"
     * @example "21:00" => "21g00"
     */
    protected convertToDisplayTimeString(value: string): string {
        return Model.dateTimeUtil.getDisplayTimeString(value);
    }

    /**
     * Convert a string representing DateTime in ISO format to a string
     * representing DateTime in the format for displaying
     * @param value A string representing DateTime in ISO format.
     * @returns A string representing DateTime in displaying format.
     * @example "1997-08-30T21:00:00" => "21g00, 30 tháng 8, 1997"
     */
    protected convertToDisplayDateTimeString(value: string): string {
        return Model.dateTimeUtil.getstring(value);
    }

    /**
     * Convert a string representing `Date` or `DateTime` in ISO format to a
     * string representing `Date` in the format that can be used as the value
     * for `HTMLInputElement` of type `date`.
     * @param value A string representing `Date` or `DateTime` in ISO format.
     * @returns A string representing `Date` in the format that can be used as
     * the value for `HTMLInputElement`.
     */
    protected convertToHTMLDateInputString(value: string | null): string {
        return Model.dateTimeUtil.getDateHTMLInputElementString(value);
    }

    /**
     * Convert a string representing `Time` or `DateTime` in ISO format to a
     * string representing `Time` in the format that can be used as the value
     * for `HTMLInputElement` of type `time`.
     * @param value A string representing `Time` or `DateTime` in ISO format.
     * @returns A string representing `Time` in the format that can be used as
     * the value for `HTMLInputElement`.
     */
    protected convertToHTMLTimeInputString(value: string | null): string {
        return Model.dateTimeUtil.getTimeHTMLInputElementString(value);
    }

    /**
     * Convert a string representing `DateTime` in ISO format to a string
     * representing `DateTime` in the format that can be used as the value
     * for `HTMLInputElement` of type `local-datetime`.
     * @param value A string representing `DateTime` in ISO format.
     * @returns A string representing `DateTime` in the format that can be
     * used as the value for `HTMLInputElement`.
     */
    protected convertToHTMLDateTimeInputString(value: string | null): string {
        return Model.dateTimeUtil.getDateTimeHTMLInputElementString(value);
    }

    /**
     * Convert the value retrieved from `HTMLInputElement` of type `date` into
     * a string representing `Date` in ISO format.
     * @param value The value retrieved from `HTMLInputElement` of type `date`.
     * @returns A string representing `Date` in ISO format.
     */
    protected convertToDateISOString(value: string): string {
        return Model.dateTimeUtil.getRequestDtoDateString(value);
    }

    /**
     * Convert the value retrieved from `HTMLInputElement` of type `time` into
     * a string representing `Time` in ISO format.
     * @param value The value retrieved from `HTMLInputElement` of type `time`.
     * @returns A string representing `Time` in ISO format.
     */
    protected convertToTimeISOString(value: string): string {
        return Model.dateTimeUtil.getRequestDtoTimeString(value);
    }

    /**
     * Convert the value retrieved from `HTMLInputElement` of type `local-datetime`
     * into a string representing `DateTime` in ISO format.
     * @param value The value retrieved from `HTMLInputElement` of type `local-datetime`.
     * @returns A string representing `DateTime` in ISO format.
     */
    protected convertToDateTimeISOString(value: string): string {
        return Model.dateTimeUtil.getRequestDtoDateTimeString(value);
    }

    /**
     * Get the url string of the default avatar. The default avatar image will be
     * generated based on the given full name of the person.
     * @param fullName The full name of the person whose the avatar is.
     * @returns A url string of the default avatar image.
     */
    protected getDefaultAvatarUrlByFullName(fullName: string): string {
        return Model.avatarUtil.getAvatarUrlByFullName(fullName);
    }

    /**
     * Get the default photo url string which is used as the placeholder for
     * resoureces when those resources' photos/thumbnail doesn't/don't exist.
     * @returns A url string to the default thumbnail/photo.
     */
    protected getDefaultPhotoUrl(): string {
        return Model.photoUtil.getDefaultPhotoUrl();
    }
}