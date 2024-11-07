declare global {
    namespace ResponseDtos.Consultant {
        type Basic = Implements<IHasCustomerBasic<ExistingAuthorization>, {
            id: number;
            amount: number;
            statsDateTime: string;
            isLocked: boolean;
            customer: ResponseDtos.Customer.Basic;
            authorization: ExistingAuthorization | null;
        }>;
        
        type List = Implements<IHasCustomerList<Basic, ExistingAuthorization>, {
            pageCount: number;
            items: Basic[];
        }>;
        
        type Detail = Implements<IHasCustomerDetail<
                UpdateHistory,
                ExistingAuthorization>, {
            customer: ResponseDtos.Customer.Basic;
            amount: number;
            isLocked: boolean;
            updateHistories: UpdateHistory[] | null;
            createdUser: ResponseDtos.User.Basic;
            createdDateTime: string;
            authorization: ExistingAuthorization | null;
            id: number;
        }>;
        
        type CreatingAuthorization = Implements<IHasStatsCreatingAuthorization, {
            canSetStatsDateTime: boolean;
        }>;
        
        type ExistingAuthorization = Implements<IHasStatsExistingAuthorization, {
            canEdit: boolean;
            canDelete: boolean;
            canSetStatsDateTime: boolean;
        }>;
    }
}

export { };
