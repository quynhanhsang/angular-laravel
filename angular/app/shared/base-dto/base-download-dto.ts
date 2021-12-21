import { ValidationResult } from "./validation-result";

export class BaseDownloadDto {
    ids: string [];

    validate() {
        const result = new ValidationResult();
        if(this.ids == null || this.ids == undefined || this.ids.length == 0) {
            result.set(false, "Dữ liệu đầu vào không hợp lệ");
        }
        return result;
    }
}
