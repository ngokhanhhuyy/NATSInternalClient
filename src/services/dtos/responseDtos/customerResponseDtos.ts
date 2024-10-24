import { DebtOperationType, Gender } from "../enums";

declare global {
    interface CustomerBasicResponseDto {
        id: number;
        fullName: string;
        nickName: string | null;
        gender: Gender;
        birthday: string | null;
        phoneNumber: string | null;
        debtAmount: number;
        authorization: CustomerAuthorizationResponseDto | null;
    }
    
    interface CustomerListResponseDto {
        pageCount: number;
        items: CustomerBasicResponseDto[] | null;
        authorization: CustomerListAuthorizationResponseDto | null;
    }
    
    interface CustomerDetailResponseDto {
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
        createdDateTime: string;
        updatedDateTime: string | null;
        introducer: CustomerBasicResponseDto | null;
        debtAmount: number;
        debtOperations: CustomerDebtOperationResponseDto[] | null;
        authorization: CustomerAuthorizationResponseDto;
    }
    
    interface CustomerCreateResponseDto {
        id: number;
    }
    
    interface CustomerAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
    
    interface CustomerListAuthorizationResponseDto {
        canCreate: boolean;
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