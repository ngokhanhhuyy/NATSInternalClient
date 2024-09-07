import type { UserDetailResponseDto } from "@/services/dtos/responseDtos/userResponseDtos";
import { UserDetailModel } from "@/models";
import { defineStore } from "pinia";
import { useUserService } from "@/services/userService";
import { RoleConstants } from "@/constants/roleConstants";
import { AuthenticationError } from "@/services/exceptions";
import { useAuthStore } from "@/stores/auth";
import { router } from "@/router";

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
        async loadCurrentUser(): Promise<void> {
            const userService = useUserService();
            const responseDto = await userService.getCallerDetailAsync();
            this.user = new UserDetailModel(responseDto);
        },

        clearCurrentUser(): void {
            this.user = null;
            localStorage.removeItem("currentUser");
        },
    }
});