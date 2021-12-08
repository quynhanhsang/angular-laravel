export class ValidationResult {
    isSuccess: boolean;
    errorMessage: string;

    constructor() {
        this.isSuccess = true;
    }

    set(isSuccess: boolean, errorMessage: string) {
        this.isSuccess = isSuccess;
        this.errorMessage = errorMessage;
    }
}