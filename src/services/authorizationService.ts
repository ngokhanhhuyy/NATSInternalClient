import { useCurrentUserStore } from "@/stores/currentUser";
import { PermissionConstants } from "@/constants/permissionConstants";
import { RoleConstants } from "@/constants/roleConstants";

type PermissionSelector = (permissions: typeof PermissionConstants) => string;

export interface IAuthorizationService {
    canCreateUser(): boolean,
    canEditUser(userId: number, powerLevel: number): boolean,
    canEditUserPersonalInformation(userId: number, powerLevel: number): boolean,
    canEditUserUserInformation(userId: number, powerLevel: number): boolean,
    canChangeUserPassword(userId: number): boolean,
    canResetUserPassword(userId: number, powerLevel: number): boolean,
    canDeleteUser(userId: number, powerLevel: number): boolean,
    canRestoreUser(userId: number): boolean,
    canAssignToRole(rolePowerLevel: number): boolean,
    canGetNote(powerLevel: number): boolean;
    canCreateSupply(): boolean;
    canEditSupplyItems(): boolean;
    canEditSupplyPhotos(): boolean;
    canCreateExpense(): boolean;
    canEditExpense(): boolean;
    canDeleteExpense(): boolean;
    canCreateOrder(): boolean;
    canEditOrder(): boolean;
    canDeleteOrder(): boolean;
    canSetOrderOrderedDateTime(): boolean;
    canCreateDebt(): boolean;
    canEditDebt(): boolean;
    canDeleteDebt(): boolean;
    canSetDebtCreatedDateTime(): boolean;
    canCreateDebtPayment(): boolean;
    canEditDebtPayment(): boolean;
    canDeleteDebtPayment(): boolean;
    canSetDebtPaymentPaidDateTime(): boolean;
    canCreateConsultant(): boolean;
    canEditConsultant(): boolean;
    canDeleteConsultant(): boolean;
    canSetConsultantPaidDateTime(): boolean;
    hasPermission(arg: string | PermissionSelector): boolean
}

export function useAuthorizationService(): IAuthorizationService {
    const currentUserStore = useCurrentUserStore();
    const thisUser = currentUserStore.user!;

    const thisUserIsDeveloper = (() => thisUser.userInformation!.role!.name == RoleConstants.Developer)()!;
    const thisUserIsManager = (() => thisUser.userInformation!.role!.name == RoleConstants.Manager)()!;
    const thisUserPowerLevel = (() => thisUser.userInformation!.role!.powerLevel)()!;

    return {
        canCreateUser(): boolean {
            return this.hasPermission(PermissionConstants.CreateUser);
        },

        canEditUser(userId: number, powerLevel: number): boolean {
            if (thisUser == null) {
                return false;
            }
    
            const isSelf = thisUser.id === userId;
            const canEditSelfPersonalInformation = this.hasPermission(PermissionConstants.EditSelfPersonalInformation);
            const canEditSelfUserInformation  = this.hasPermission(PermissionConstants.EditSelfUserInformation);
            if (isSelf && (canEditSelfPersonalInformation || canEditSelfUserInformation)) {
                return true; 
            }
            if (thisUserIsDeveloper || thisUserIsManager) {
                if (thisUserPowerLevel <= powerLevel) {
                    return false;
                }
                return true;
            }
    
            return false;
        },

        canEditUserPersonalInformation(userId: number, powerLevel: number): boolean {
            if (thisUser.id == userId &&
                    this.hasPermission(PermissionConstants.EditSelfPersonalInformation)) {
                return true;
            } else if (this.hasPermission(PermissionConstants.EditOtherUserUserInformation)
                    && thisUserPowerLevel > powerLevel) {
                return true;
            }
            return false;
        },

        canEditUserUserInformation(userId: number, powerLevel: number): boolean {
            if (thisUser.id == userId &&
                    this.hasPermission(PermissionConstants.EditSelfUserInformation)) {
                return true;
            } else if (this.hasPermission(PermissionConstants.EditOtherUserUserInformation)
                    && thisUserPowerLevel > powerLevel) {
                return true;
            }
            return false;
        },

        canChangeUserPassword(userId: number): boolean {
            return thisUser.id === userId;
        },

        canResetUserPassword(userId: number, powerLevel: number): boolean {
            return thisUser.id != userId &&
                this.hasPermission(PermissionConstants.ResetOtherUserPassword) &&
                thisUserPowerLevel > powerLevel;
        },

        canDeleteUser(userId: number, powerLevel: number): boolean {
            return thisUser.id != userId &&
                this.hasPermission(PermissionConstants.DeleteUser) &&
                thisUserPowerLevel > powerLevel;
        },

        canRestoreUser(userId: number): boolean {
            return thisUser.id != userId &&
                this.hasPermission(PermissionConstants.RestoreUser);
        },

        canAssignToRole(rolePowerLevel: number): boolean {
            return thisUserIsDeveloper ||
                thisUserIsManager ||
                thisUserPowerLevel > rolePowerLevel;
        },

        canGetNote(powerLevel: number): boolean {
            return this.hasPermission(PermissionConstants.GetOtherUserNote) &&
                thisUserPowerLevel > powerLevel;
        },

        canCreateSupply(): boolean {
            return this.hasPermission(PermissionConstants.CreateSupply);
        },

        canEditSupplyItems(): boolean {
            return this.hasPermission(PermissionConstants.EditSupplyItem);
        },

        canEditSupplyPhotos(): boolean {
            return this.hasPermission(PermissionConstants.EditSupplyPhoto);
        },

        canCreateExpense(): boolean {
            return this.hasPermission(PermissionConstants.CreateExpense);
        },

        canEditExpense(): boolean {
            return this.hasPermission(PermissionConstants.EditExpense);
        },

        canDeleteExpense(): boolean {
            return this.hasPermission(PermissionConstants.DeleteExpense);
        },

        canCreateOrder(): boolean {
            return this.hasPermission(PermissionConstants.CreateOrder);
        },

        canEditOrder(): boolean {
            return this.hasPermission(PermissionConstants.EditOrder);
        },

        canDeleteOrder(): boolean {
            return this.hasPermission(PermissionConstants.DeleteOrder);
        },

        canSetOrderOrderedDateTime(): boolean {
            return this.hasPermission(PermissionConstants.SetOrderOrderedDateTime);
        },

        canCreateDebt(): boolean {
            return this.hasPermission(PermissionConstants.CreateDebt);
        },

        canEditDebt(): boolean {
            return this.hasPermission(PermissionConstants.EditDebt);
        },

        canDeleteDebt(): boolean {
            return this.hasPermission(PermissionConstants.DeleteDebt);
        },

        canSetDebtCreatedDateTime(): boolean {
            return this.hasPermission(PermissionConstants.SetDebtCreatedDateTime);
        },

        canCreateDebtPayment(): boolean {
            return this.hasPermission(PermissionConstants.CreateDebtPayment);
        },

        canEditDebtPayment(): boolean {
            return this.hasPermission(PermissionConstants.EditDebtPayment);
        },

        canDeleteDebtPayment(): boolean {
            return this.hasPermission(PermissionConstants.DeleteDebtPayment);
        },

        canSetDebtPaymentPaidDateTime(): boolean {
            return this.hasPermission(PermissionConstants.SetDebtPaymentPaidDateTime);
        },

        canCreateConsultant(): boolean {
            return this.hasPermission(PermissionConstants.CreateConsultant);
        },

        canEditConsultant(): boolean {
            return this.hasPermission(PermissionConstants.EditConsultant);
        },

        canDeleteConsultant(): boolean {
            return this.hasPermission(PermissionConstants.DeleteConsultant);
        },

        canSetConsultantPaidDateTime() {
            return this.hasPermission(PermissionConstants.SetConsultantPaidDateTime);
        },

        hasPermission(arg: string | PermissionSelector): boolean {
            let permission: string;
            if (typeof arg === "function") {
                permission = arg(PermissionConstants);
            } else {
                permission = arg;
            }
            return thisUser.userInformation!.role!.permissions!.includes(permission);
        },
    };
}