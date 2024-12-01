import { useApiClient } from "./apiClient";

const apiClient = useApiClient();
const service = {
    /**
     * Retrieves daily stats with details by a given recorded date. If the date is not
     * specified, the returned stats will be today stats.
     * @param recorededDate The date when the daily stats was recorded.
     * @returns A {@link Promise} representing the asynchonous operation, which result is a DTO
     * object containing the detail information of the daily stats.
     *
     * @throws {NotFoundError} Thrown when the stats recorded at the specified date doesn't
     * exist.
     */
    async getDailyDetailAsync(recorededDate: string): Promise<ResponseDtos.Stats.DailyDetail> {
        return await apiClient.getAsync("/stats/daily", { recorededDate });
    },

    /**
     * Retrieves the stats of lastest dates with basic information, specified by the count of
     * dates, from today (if the `requestDto` specifies) or yesterday to the past.
     * 
     * @param requestDto A DTO indicating the count number of dates and whether today's data
     * should be included.
     * @returns A {@link Promise} representing the asynchonous operation, which result is a DTO
     * containing the basic information of the dates' stats.
     */
    async getLastestDailyBasicAsync(requestDto: RequestDtos.Stats.LastestDaily):
            Promise<ResponseDtos.Stats.DailyBasic[]> {
        return await apiClient.getAsync("/stats/lastestDailyBasic", requestDto);
    },

    /**
     * Retrieves the stats of lastest dates with details, specified by the count of dates, from
     * today (if the `requestDto` specifies) or yesterday to the past.
     * 
     * @param requestDto A DTO indicating the count number of dates and whether today's data
     * should be included.
     * @returns A {@link Promise} representing the asynchonous operation, which result is a DTO
     * containing the basic information of the dates' stats.
     */
    async getLastestDailyDetailAsync(requestDto: RequestDtos.Stats.LastestDaily):
            Promise<ResponseDtos.Stats.DailyDetail[]> {
        return await apiClient.getAsync("/stats/lastestDailyDetail", requestDto);
    },

    /**
     * Retrieves monthly stats with details by a given recorded month and year. If the date is
     * not specified, the returned stats will be this month stats.
     * 
     * @param requestDto A DTO object containing expected recorded year and month when the
     * monthly stats was recorded.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * DTO object containing the detail information of the monthly stats.
     * 
     * @throws {NotFoundError} Thrown when the stats recorded at the specified month and year
     * doesn't exist.
     */
    async getMonthlyDetailAsync(requestDto: RequestDtos.Stats.Monthly):
            Promise<ResponseDtos.Stats.MonthlyDetail> {
        return await apiClient.getAsync("/stats/monthly", requestDto);
    },

    /**
     * Retrieves the stats of lastest months with basic information, specified by the count of
     * months, from this month (if the `requestDto` specifies), to the past.
     * 
     * @param requestDto A DTO instance indicating the count number of months and whethere the
     * this month data should be included.
     * @returns A {@link Promise} representing the asynchonous operation, which result is a DTO
     * containing the basic information of the months' stats.
     */
    async getLastestMonthlyAsync(requestDto: RequestDtos.Stats.LastestMonthly):
            Promise<ResponseDtos.Stats.MonthlyBasic[]> {
        return await apiClient.getAsync("/stats/lastestMonthly", requestDto);
    },
}

/**
 * A service to send requests and handle responses representing the stats related operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useStatsService() {
    return service;
}