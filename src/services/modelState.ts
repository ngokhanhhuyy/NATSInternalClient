import type { IModelStateErrors } from "./exceptions";

/**
 * Inspired by ModelStateDictionary class and ModelState property
 * in ASP.NET Core MVC, this interface/class is to store and
 * display error messages for each property in a model.
 */
export interface IModelState {
    /**
     * Get the valid state of the model state, the result will be always true if the
     * model hasn't been validated yet. Otherwise, if the model has any error, the result
     * will be false.
     */
    isValid: boolean;

    /**
     * Check if the model has been validated. The result will be
     * true after the model state has been set some errors and before
     * being reset errors.
     */
    isValidated: boolean;

    /**
     * Check if the model has been validated and the property has any error.
     * @param propertyPath The path of the property in the model.
     * @returns If the model hasn't been validated, the result will be always false.
     * Otherwise, the result will be true if the property has any error.
     */
    hasError: (propertyPath: string) => boolean;

    /**
     * 
     * @param propertyPath The path of the property in the model.
     * @returns If the property has any errors, the result will be the first error message
     */
    getError: (propertyPath: string) => string | null;

    /**
     * Get the text for the message element of a property with given path.
     * @param propertyPath 
     * @returns The text will be "Hợp lệ" if the property doesn't have any error.
     * Otherwise, the text will be the first error message of the property.
     */
    getMessage: (propertyPath: string) => string;

    /**
     * Set new errors and set the validation state into validated state.
     * @param errors An object contaning errors for properties.
     */
    setErrors: (errors: IModelStateErrors) => void;
    
    /**
     * Clear the current errors.
     */
    clearErrors: () => void;
    
    /**
     * Clear the current errors and set validation state to initial state.
     */
    resetErrors: () => void;
    
    /**
     * Get Bootstrap class name for the input element
     * based on the validation state of the property with given path.
     * @param propertyPath The path of the property in the model.
     * @returns Bootstrap class-name for the input element.
     */
    inputClass: (propertyPath: string) => string | null;

    /**
     * Get Bootstrap class name for message element based on the
     * validation state of the property with given path.
     * @param propertyPath The path of the property in the model.
     * @returns Bootstrap class-name for the message element.
     */
    messageClass: (propertyPath: string) => string | null;
}

/**
 * @inheritdoc
 */
export class ModelState implements IModelState {
    private _errors: IModelStateErrors = {};
    private _isValidated: boolean = false;

    public get isValid(): boolean {
        if (this._isValidated) {
            return this._errors == null || Object.keys(this._errors).length === 0;
        }
        return true;
    }

    public get isValidated(): boolean {
        return this._isValidated;
    }

    public hasError(propertyPath: string): boolean {
        if (!this._isValidated) { return false; }

        try {
            return this._errors![propertyPath as keyof typeof this._errors][0] != null;
        } catch (exception) {
            return false;
        }
    }

    public getError(propertyPath: string): string | null {
        if (!this._isValidated) { return null; }

        try {
            return this._errors[propertyPath][0] || null;
        } catch {
            return null;
        }
    }

    public getMessage(propertyPath: string): string {
        return this.getError(propertyPath) || "Hợp lệ";
    }

    public setErrors(errors: IModelStateErrors): void {
        this._errors = errors;
        this._isValidated = true;
    }

    public clearErrors(): void {
        this._isValidated = true;
        this._errors = {};
    }

    public resetErrors(): void {
        this.clearErrors();
        this._isValidated = false;
    }

    public inputClass(propertyPath: string): string | null {
        if (this._isValidated) {
            return this.hasError(propertyPath) ? "is-invalid" : "is-valid";
        }
        return null;
    }

    public messageClass(propertyPath: string): string | null {
        if (this._isValidated) {
            return this.hasError(propertyPath) ? "text-danger" : "text-success";
        }
        return null;
    }
}