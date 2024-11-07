declare global {
    namespace ResponseDtos.DebtPayment {
        type Basic = Implements<IDebtBasic<ExistingAuthorization>, {
            id: number;
            amount: number;
            statsDateTime: string;
            isLocked: boolean;
            customer: ResponseDtos.Customer.Basic;
            authorization: ExistingAuthorization | null;
        }>;
        
        type List = Implements<IDebtList<Basic, ExistingAuthorization>, {
            pageCount: number;
            items: Basic[];
        }>;
        
        type Detail = Implements<IDebtDetail<UpdateHistory, ExistingAuthorization>, {
            id: number;
            amount: number;
            note: string | null;
            statsDateTime: string;
            createdDateTime: string;
            isLocked: boolean;
            customer: ResponseDtos.Customer.Basic;
            createdUser: ResponseDtos.User.Basic;
            authorization: ExistingAuthorization;
            updateHistories: UpdateHistory[] | null;
        }>;
        
        type CreatingAuthorization = Implements<IHasStatsCreatingAuthorization,{
            canSetStatsDateTime: boolean;
        }>;
        
        type ExistingAuthorization = Implements<IHasStatsExistingAuthorization, {
            canEdit: boolean;
            canDelete: boolean;
            canSetStatsDateTime: boolean;
        }>;

        type ExistingAuthorization1 = Implements<IHasStatsExistingAuthorization, {
            canEdit: boolean;
            canDelete: boolean;
            canSetStatsDateTime: boolean;
        }>;
    }
}

export { };