declare global {
    namespace ResponseDtos {
        namespace Treatment {
            type UpdateHistory = Implements<IExportProductUpdateHistory<ItemUpdateHistory>, {
                updatedDateTime: string;
                updatedUser: ResponseDtos.User.Basic;
                updatedReason: string;
                oldStatsDateTime: string;
                oldServiceAmount: number;
                oldServiceVatAmount: number;
                oldNote: string | null;
                oldTherapist: ResponseDtos.User.Basic;
                oldItems: ItemUpdateHistory[] | null;
                newStatsDateTime: string;
                newServiceAmount: number;
                newServiceVatAmount: number;
                newNote: string | null;
                newTherapist: ResponseDtos.User.Basic;
                newItems: ItemUpdateHistory[] | null;
            }>;

            type ItemUpdateHistory = Implements<IExportProductItemUpdateHistory, {
                id: number;
                productAmountPerUnit: number;
                vatAmountPerUnit: number;
                quantity: number;
                productName: string;
            }>;
        }
    }
}

export { };