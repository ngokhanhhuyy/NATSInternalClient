/**
 * A utility to convert a number as amount into a formated string for displaying.
 *
 * @returns An object containing the method for converting.
 */
export function useAmountUtility() {
    return {
        getDisplayText(amount: number) {
            return amount.toLocaleString().replaceAll(".", " ") + " vnđ";
        }
    };
}