import { DebtOperationType, Gender } from "@enums";

declare global {
    interface CustomerBasicResponseDto extends IUpsertableBasicResponseDto {
        id: number;
        fullName: string;
        nickName: string | null;
        gender: Gender;
        birthday: string | null;
        phoneNumber: string | null;
        debtAmount: number;
        authorization: CustomerExistingAuthorizationResponseDto | null;
    }
    
    interface CustomerListResponseDto extends IUpsertableListResponseDto {
        pageCount: number;
        items: CustomerBasicResponseDto[];
    }
    
    interface CustomerDetailResponseDto extends IUpsertableDetailResponseDto {
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
    
    interface CustomerExistingAuthorizationResponseDto
            extends IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
    
    interface CustomerDebtOperationResponseDto {
        operation: DebtOperationType,
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