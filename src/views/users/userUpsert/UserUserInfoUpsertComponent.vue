<script lang="ts">
interface Props {
    authorization?: UserDetailAuthorizationModel;
}
</script>

<script setup lang="ts">
import {
    UserDetailAuthorizationModel,
    UserUserInformationUpsertModel } from "@/models/userModels";

// Layout components.
import SubBlock from "@/views/layouts/SubBlockComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import TextInput from "@/components/formInputs/TextInputComponent.vue";
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";
import DateInput from "@/components/formInputs/DateInputComponent.vue";
import ValidationMessage from "@/components/formInputs/ValidationMessage.vue";

// Props and emits.
defineProps<Props>();

// Model.
const model = defineModel<UserUserInformationUpsertModel>({ required: true });
</script>

<template>
    <SubBlock title="Thông tin nhân viên" body-class="row g-3" rounded-bottom>
        <!-- JoiningDate -->
        <div class="col col-sm-6 col-12">
            <div class="form-group">
                <FormLabel text="Ngày gia nhập" />
                <DateInput name="userInformation.joiningDate" v-model="model.joiningDate" />
                <ValidationMessage name="userInformation.joiningDate" />
            </div>
        </div>
        
        <!-- Role -->4
        <div class="col col-sm-6 col-12"
                v-if="authorization?.canAssignRole ?? true">
            <div class="form-group">
                <FormLabel text="Vị trí" required/>
                <SelectInput name="userInformation.role" v-model="model.roleName">
                    <option :value="role.name" v-for="role in model.roleOptions"
                            :key="role.id">
                        {{ role.displayName }}
                    </option>
                </SelectInput>
                <ValidationMessage name="userInformation.role" />
            </div>
        </div>
        
        <!-- Note -->
        <div class="col col-12">
            <div class="form-group">
                <div class="form-group">
                    <FormLabel text="Ghi chú" />
                    <TextInput name="userInformation.joiningDate"
                            type="textarea" maxlength="255"
                            placeholder="Ghi chú ..." />
                    <ValidationMessage name="userInformation.joiningDate" />
                </div>
            </div>
        </div>
    </SubBlock>
</template>