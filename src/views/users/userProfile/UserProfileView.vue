<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { UserDetailModel } from "@/models/userModels";
import { useUserService } from "@/services/userService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child components.
import PersonalInformation from "./PersonalInformationComponent.vue";
import UserInformation from "./UserInformationComponent.vue";
import AvatarAndNames from "./AvatarAndNamesComponent.vue";

// Dependencies.
const route = useRoute();
const userService = useUserService();

// Internal states.
const model = await initializeModelAsync();
useViewStates();

// Functions.
async function initializeModelAsync(): Promise<UserDetailModel> {
    const userId = parseInt(route.params.userId as string);
    const responseDto = await userService.getUserDetailAsync(userId);
    return reactive(new UserDetailModel(responseDto));
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 position-relative">
            <!-- Avatar and names -->
            <div class="col col-12" v-if="model.personalInformation">
                <AvatarAndNames v-model="model" />
            </div>

            <!-- Personal information -->
            <div class="col col-md-6 col-sm-12 col-12"
                    v-if="model.personalInformation">
                <PersonalInformation v-model="model.personalInformation" />
            </div>
            

            <!-- User information -->
            <div class="col col-md-6 col-sm-12 col-12"
                    v-if="model.userInformation">
                <UserInformation v-model:user="model.userInformation"
                        v-model:authorization="model.authorization" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
label {
    font-weight: bold;
}
</style>