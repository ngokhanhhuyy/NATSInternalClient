declare global {
    type ConsultantUpdateHistoryResponseDto = InstanceType<typeof ResponseDtos.Consultant.UpdateHistory>;

    namespace ResponseDtos {
        namespace Consultant {
            class UpdateHistory implements IHasStatsUpdateHistory {
                updatedDateTime: string;
                updatedUser: UserBasicResponseDto;
                updatedReason: string;
                oldStatsDateTime: string;
                oldAmountBeforeVat: number;
                oldVatAmount: number;
                oldNote: string;
                newStatsDateTime: string;
                newAmountBeforeVat: number;
                newVatAmount: number;
                newNote: string;
            }
        }
    }
}

export { };