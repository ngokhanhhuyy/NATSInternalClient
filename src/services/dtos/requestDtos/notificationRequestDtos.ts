declare global {
    class NotificationListRequestDto implements IListRequestDto {
        page: number;
        resultsPerPage: number;
    }
}

export { };