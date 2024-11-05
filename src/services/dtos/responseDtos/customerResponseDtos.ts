import { DebtOperationType, Gender } from "@enums";

declare global {
    type ResponseDtos.Customer.Basic = InstanceType<typeof ResponseDtos.Customer.Basic>;
    type CustomerListResponseDto = InstanceType<typeof ResponseDtos.Customer.List>;
    type CustomerDetailResponseDto = InstanceType<typeof ResponseDtos.Customer.Detail>;
    type CustomerExistingAuthorization = InstanceType<typeof ResponseDtos.Customer.ExistingAuthorization>;
    type CustomerDebtOperationResponseDto = InstanceType<typeof ResponseDtos.Customer.DebtOperation>;
    type CustomerDebtOperationAuthorizationResponseDto = InstanceType<typeof ResponseDtos.Customer.DebtOperationAuthorization>;

    namespace ResponseDtos {
        namespace Customer {
            class Basic implements IUpsertableBasic<ExistingAuthorization> {
                id: number;
                fullName: string;
                nickName: string | null;
                gender: Gender;
                birthday: string | null;
                phoneNumber: string | null;
                debtAmount: number;
                authorization: ExistingAuthorization | null;
            }
            
            class List implements IUpsertableList<Basic, ExistingAuthorization> {
                pageCount: number;
                items: ResponseDtos.Customer.Basic[];
            }
            
            class Detail implements IUpsertableDetail<ExistingAuthorization> {
                id: number;
                firstName: string;
                middleName: string | null;
                lastName: string;
                fullName: string;
                nickName: string | null;
                gender: Gender;
                birthday: string | null;
                phoneNumber: string | null;
                zaloNumber: string | null;
                facebookUrl: string | null;
                email: string | null;
                address: string | null;
                note: string | null;
                createdUser: UserBasicResponseDto;
                createdDateTime: string;
                updatedDateTime: string | null;
                introducer: ResponseDtos.Customer.Basic | null;
                debtAmount: number;
                debtOperations: DebtOperation[] | null;
                authorization: ExistingAuthorization;
            }
            
            class ExistingAuthorization implements IUpsertableExistingAuthorization {
                canEdit: boolean;
                canDelete: boolean;
            }
            
            class DebtOperation {
                operation: DebtOperationType;
                amount: number;
                operatedDateTime: string;
                isLocked: boolean;
                authorization: DebtOperationAuthorization;
            }
            
            class DebtOperationAuthorization {
                canEdit: boolean;
                canDelete: boolean;
            }
        }
    }
}

export { };