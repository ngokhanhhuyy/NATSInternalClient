import { DebtOperationType, Gender } from "@enums";

declare global {
    class CustomerBasicResponseDto
            implements IUpsertableBasicResponseDto<CustomerExistingAuthorizationResponseDto> {
        id: number;
        fullName: string;
        nickName: string | null;
        gender: Gender;
        birthday: string | null;
        phoneNumber: string | null;
        debtAmount: number;
        authorization: CustomerExistingAuthorizationResponseDto | null;
    }
    
    class CustomerListResponseDto
            implements IUpsertableListResponseDto<
                CustomerBasicResponseDto,
                CustomerExistingAuthorizationResponseDto> {
        pageCount: number;
        items: CustomerBasicResponseDto[];
    }
    
    class CustomerDetailResponseDto
            implements IUpsertableDetailResponseDto<
                CustomerExistingAuthorizationResponseDto> {
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
        introducer: CustomerBasicResponseDto | null;
        debtAmount: number;
        debtOperations: CustomerDebtOperationResponseDto[] | null;
        authorization: CustomerExistingAuthorizationResponseDto;
    }
    
    class CustomerExistingAuthorizationResponseDto
            implements IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
    
    class CustomerDebtOperationResponseDto {
        operation: DebtOperationType;
        amount: number;
        operatedDateTime: string;
        isLocked: boolean;
        authorization: CustomerDebtOperationAuthorizationResponseDto;
    }
    
    interface CustomerDebtOperationAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };