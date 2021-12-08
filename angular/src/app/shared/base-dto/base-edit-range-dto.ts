import { ValidationResult } from "./validation-result";

export class BaseEditRangeDto {
    ids: string [];
    tags: string [];
    validate() {
        const result = new ValidationResult();
        if(this.ids == null || this.ids == undefined || this.ids.length == 0) {
            result.set(false, "Dữ liệu đầu vào không hợp lệ");
        }
        return result;
    }
}
