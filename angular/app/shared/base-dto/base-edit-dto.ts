import { ValidationResult } from "./validation-result";

export class BaseEditDto {
    id: string;

    validate() {
        const result = new ValidationResult();
        if(this.id == null || this.id == undefined) {
            result.set(false, "Dữ liệu đầu vào không hợp lệ");
        }
        return result;
    }
}