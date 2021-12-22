import { ValidationResult } from "./validation-result";

export class BaseAddDto {
    validate() : ValidationResult {
        const result = new ValidationResult();
        return result;
    }
}