declare global {
    namespace RequestDtos {
        interface IHasStatsList extends ICreatorTrackableList {
            monthYear: ListMonthYear;
        }

        interface IHasStatsUpsert {
            statsDateTime: string | null;
            note: string | null;
            updatedReason: string | null;
        }
    }
}

export { };