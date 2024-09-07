import { UserDetailModel } from "@/models";
import { defineStore } from "pinia";
import { useUserService } from "@/services/userService";
import { RoleConstants } from "@/constants/roleConstants";

export const useCurrentUserStore = defineStore("currentUser", {
    state: (): { user: UserDetailModel | null } => ({
        user: null
    }),
    getters: {
        hasData: (state): boolean => state.user != null,
        isDeveloper: (state): boolean => {
            if (state.user == null ||
                    state.user.userInformation == null ||
                    state.user.userInformation.role == null) {
                return false;
            }
            return state.user.userInformation.role.name == RoleConstants.Developer;
        },
        isManager: (state): boolean => {
            if (state.user == null ||
                    state.user.userInformation == null ||
                    state.user.userInformation.role == null) {
                return false;
            }
            return state.user.userInformation.role.name == RoleConstants.Manager;
        },
    },
    actions: {
        async loadCurrentUserAsync(): Promise<UserDetailModel> {
            const userService = useUserService();
            const responseDto = await userService.getCallerDetailAsync();
            this.user = new UserDetailModel(responseDto);
            return this.user;
        },

        async getCurrentUserAsync(): Promise<UserDetailModel> {
            if (!this.user) {
                this.user = await this.loadCurrentUserAsync();
            }

            return this.user;
        },

        clearCurrentUser(): void {
            this.user = null;
            localStorage.removeItem("currentUser");
        },
    }
});