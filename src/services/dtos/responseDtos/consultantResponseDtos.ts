declare global {
    type ConsultantBasicResponseDto = InstanceType<typeof ResponseDtos.Consultant.Basic>;
    type ConsultantListResponseDto = InstanceType<typeof ResponseDtos.Consultant.List>;
    type ConsultantDetailResponseDto = InstanceType<typeof ResponseDtos.Consultant.Detail>;
    type ConsultantCreatingAuthorizationResponseDto = InstanceType<typeof ResponseDtos.Consultant.CreatingAuthorization>;
    type ConsultantExistingAuthorizationResponseDto = InstanceType<typeof ResponseDtos.Consultant.ExistingAuthorization>;

    namespace ResponseDtos {
        namespace Consultant {
            class Basic implements IHasCustomerBasic<ExistingAuthorization> {
                id: number;
                amount: number;
                statsDateTime: string;
                isLocked: boolean;
                customer: ResponseDtos.Customer.Basic;
                authorization: ExistingAuthorization | null;
            }
            
            class List implements IHasCustomerList<Basic, ExistingAuthorization> {
                pageCount: number;
                items: Basic[];
            }
            
            class Detail implements IHasCustomerDetail<UpdateHistory, ExistingAuthorization> {
                customer: ResponseDtos.Customer.Basic;
                amount: number;
                isLocked: boolean;
                updateHistories: UpdateHistory[] | null;
                createdUser: ResponseDtos.User.Basic;
                createdDateTime: string;
                authorization: ExistingAuthorization | null;
                id: number;
            }
            
            class CreatingAuthorization implements IHasStatsCreatingAuthorization {
                canSetStatsDateTime: boolean;
            }
            
            class ExistingAuthorization implements IHasStatsExistingAuthorization {
                canEdit: boolean;
                canDelete: boolean;
                canSetStatsDateTime: boolean;
            }
        }
    }
}

export { };
