declare global {
    type DebtIncurrenceUpdateHistoryResponseDto = InstanceType<typeof ResponseDtos.DebtIncurrence.UpdateHistory>;

    namespace ResponseDtos {
        namespace DebtIncurrence {
            class UpdateHistory implements IDebtUpdateHistory {
                updatedDateTime: string;
                updatedUser: UserBasicResponseDto;
                updatedReason: string;
                oldStatsDateTime: string;
                oldAmount: number;
                oldNote: string;
                newStatsDateTime: string;
                newAmount: number;
                newNote: string;
            }
        }
    }
}

export { };