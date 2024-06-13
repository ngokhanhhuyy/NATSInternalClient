<script lang="ts">
interface Props {
    roleOptions: RoleOptionsModel;
    authorization?: UserDetailAuthorizationModel;
}
</script>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { UserDetailAuthorizationModel, UserUserInformationUpsertModel } from "@/models";
import { RoleOptionsModel } from "@/models";

// Layout components.
import SubBlock from "@/views/layouts/SubBlockComponent.vue";

// Form components.
import { FormLabel, TextInput, SelectInput, DateInput } from "@/components/formInputs";

// Async component
const ValidationMessage = defineAsyncComponent(() => 
    import("@/components/formInputs/ValidationMessage.vue"));

// Props and emits.
defineProps<Props>();

// Model.
const model = defineModel<UserUserInformationUpsertModel>({ required: true });
</script>

<template>
    <SubBlock title="Thông tin nhân viên" body-class="row gx-3"
            :body-padding="[2, 3]" rounded-bottom>
        <!-- JoiningDate -->
        <div class="col col-sm-6 col-12 mb-3">
            <div class="form-group">
                <FormLabel name="Ngày gia nhập" />
                <DateInput property-path="userInformation.joiningDate"
                        v-model="model.joiningDate" />
                <ValidationMessage property-path="userInformation.joiningDate" />
            </div>
        </div>
        
        <!-- Role -->
        <div class="col col-sm-6 col-12 mb-3"
                v-if="authorization?.canAssignRole ?? true">
            <div class="form-group">
                <FormLabel name="Vị trí" required/>
                <SelectInput property-path="userInformation.role"
                        v-model="model.role">
                    <option :value="role" v-for="role in roleOptions.items"
                            :key="role.name">
                        {{ role.displayName }}
                    </option>
                </SelectInput>
                <ValidationMessage property-path="userInformation.role" />
            </div>
        </div>
        
        <!-- Note -->
        <div class="col col-12">
            <div class="form-group">
                <div class="form-group">
                    <FormLabel name="Ghi chú" />
                    <TextInput property-path="userInformation.joiningDate"
                            type="textarea" maxlength="255"
                            placeholder="Ghi chú ..." />
                    <ValidationMessage property-path="userInformation.joiningDate" />
                </div>
            </div>
        </div>
    </SubBlock>
</template>