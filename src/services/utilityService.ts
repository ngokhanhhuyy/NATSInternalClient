import { useApiClient } from "./apiClient";

export type DisplayNames = { [key: string]: string };

const apiClient = useApiClient();
const service = {
    async getDisplayNames(): Promise<DisplayNames> {
        return await apiClient.getAsync<DisplayNames>("/utility/displayNames");
    }
};

/**
 * A service to send requests and handle responses which represent the utility-related
 * operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useUtilityService() {
    return service;
}