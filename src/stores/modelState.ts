import { defineStore } from "pinia";
import { type IModelStateErrors } from "@/services/exceptions";

interface ModelState {
    errors: IModelStateErrors | null,
    isValidated: boolean
}

export const useModelStateStore = defineStore("modelState", {
    state: (): ModelState => ({
        errors: null,
        isValidated: false
    }),
    getters: {
        isValid: (state): boolean => {
            return state.errors == null || Object.keys(state.errors).length === 0;
        }
    },
    actions: {
        hasError(propertyPath: string): boolean {
            try {
                return this.errors![propertyPath as keyof typeof this.errors][0] != null;
            } catch (exception) {
                return false;
            }
        },

        getMessage(propertyPath: string): string {
            try {
                return this.errors![propertyPath as keyof typeof this.errors][0];
            } catch {
                return "Hợp lệ";
            }
        },

        setErrors(errors: IModelStateErrors): void {
            this.errors = errors;
            this.isValidated = true;
        },

        clearErrors(): void {
            this.errors = null;
            this.isValidated = true;
        },

        resetErrors(): void {
            this.errors = null;
            this.isValidated = false;
        },

        getInputClassName(propertyPath: string): string {
            if (this.isValidated) {
                return this.hasError(propertyPath) ? "is-invalid" : "is-valid";
            }
            return "";
        },

        getMessageClassName(propertyPath: string): string {
            if (this.isValidated) {
                return this.hasError(propertyPath) ? "text-danger" : "text-success";
            }
            return "";
        }
    }
})