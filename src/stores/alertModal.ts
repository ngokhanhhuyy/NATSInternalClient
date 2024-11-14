import { defineStore } from "pinia";
import type { IModelStateErrors } from "@/errors/index";

import AlertModal from "@/components/modals/AlertModal.vue";

interface State {
    isVisible: false,
    deletingConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    notFoundConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    discardingConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    submitErrorConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    submitSuccessConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    unauthorizationConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    fileTooLargeConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
    undefinedErrorConfirmationModalInstance: InstanceType<typeof AlertModal> | null;
}

export const useAlertModalStore = defineStore("alertModal", {
    state: (): State => ({
        isVisible: false,
        deletingConfirmationModalInstance: null,
        notFoundConfirmationModalInstance: null,
        discardingConfirmationModalInstance: null,
        submitErrorConfirmationModalInstance: null,
        submitSuccessConfirmationModalInstance: null,
        unauthorizationConfirmationModalInstance: null,
        fileTooLargeConfirmationModalInstance: null,
        undefinedErrorConfirmationModalInstance: null,
    }),
    actions: {
        setDeletingConfirmationModalInstance(modalInstance: InstanceType<typeof AlertModal>): void {
            this.deletingConfirmationModalInstance = modalInstance;
        },

        setNotFoundConfirmationModalInstance(modalInstance: InstanceType<typeof AlertModal>): void {
            this.notFoundConfirmationModalInstance = modalInstance;
        },

        setDiscardingConfirmationModalInstance(modalInstance: InstanceType<typeof AlertModal>): void {
            this.discardingConfirmationModalInstance = modalInstance;
        },

        setSubmitErrorConfirmationModalInstance(modalInstance: InstanceType<typeof AlertModal>): void {
            this.submitErrorConfirmationModalInstance = modalInstance;
        },

        setSubmitSuccessConfirmationModalInstance(modalInstance: InstanceType<typeof AlertModal>): void {
            this.submitSuccessConfirmationModalInstance = modalInstance;
        },

        setUnauthorizationConfirmationModalInstance(modelInstance: InstanceType<typeof AlertModal>): void {
            this.unauthorizationConfirmationModalInstance = modelInstance;
        },

        setFileTooLargeConfirmationModalInstance(modelInstance: InstanceType<typeof AlertModal>): void {
            this.fileTooLargeConfirmationModalInstance = modelInstance;
        },

        setUndefinedErrorConfirmationModalInstance(modelInstance: InstanceType<typeof AlertModal>): void {
            this.undefinedErrorConfirmationModalInstance = modelInstance;
        },

        clearModalInstances(): void {
            this.deletingConfirmationModalInstance = null;
            this.discardingConfirmationModalInstance = null;
            this.submitErrorConfirmationModalInstance = null;
            this.submitSuccessConfirmationModalInstance = null;
            this.unauthorizationConfirmationModalInstance = null;
            this.fileTooLargeConfirmationModalInstance = null;
            this.undefinedErrorConfirmationModalInstance = null;
        },

        async getDeleteConfirmationAsync(): Promise<boolean> {
            return await this.deletingConfirmationModalInstance!.openModal();
        },

        async getNotFoundConfirmationAsync(): Promise<void> {
            await this.notFoundConfirmationModalInstance!.openModal();
            return;
        },

        async getDiscardingConfirmationAsync(): Promise<boolean> {
            return await this.discardingConfirmationModalInstance!.openModal();
        },

        async getSubmitErrorConfirmationAsync(errors?: IModelStateErrors): Promise<void> {
            if (errors) {
                await this.submitErrorConfirmationModalInstance?.openErrorModel(errors);
            } else {
                await this.submitErrorConfirmationModalInstance?.openModal();
            }
        },

        async getSubmitSuccessConfirmationAsync(): Promise<void> {
            await this.submitSuccessConfirmationModalInstance?.openModal();
            return;
        },

        async getUnauthorizationConfirmationAsync(): Promise<void> {
            await this.unauthorizationConfirmationModalInstance?.openModal();
            return;
        },

        async getFileTooLargeConfirmationAsync(): Promise<void> {
            await this.fileTooLargeConfirmationModalInstance?.openModal();
            return;
        },

        async getUndefinedErrorConfirmationAsync(): Promise<void> {
            await this.undefinedErrorConfirmationModalInstance?.openModal();
        }
    }
});