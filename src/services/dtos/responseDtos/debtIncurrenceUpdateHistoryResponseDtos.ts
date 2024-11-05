declare global {
    namespace ResponseDtos {
        namespace DebtIncurrence {
            class UpdateHistory implements IDebtUpdateHistory {
                updatedDateTime: string;
                updatedUser: ResponseDtos.User.Basic;
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