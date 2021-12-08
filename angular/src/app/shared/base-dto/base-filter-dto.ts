import { ValidationResult } from "./validation-result";

export class BaseFilterDto {
    pageIndex: number;
    pageSize: number;   // accept only 10, 25, 50, 100, 200

    // SORTS
    orderBy: string; // property name
    orderByDesc: boolean;

    // FILTERS
    ids: string; // seperated by comma

    createdDateFrom: Date;
    createdDateTo: Date;
    createdByUserIds: string;    // seperated by comma
    createdByUserNames: string; // seperated by comma

    updatedDateFrom: Date;
    updatedDateTo: Date;
    updatedByUserIds: string;    // seperated by comma
    updatedByUserNames: string; // seperated by comma

    constructor() {
        this.pageIndex = 1;
        this.pageSize = 50;
        this.orderBy = "CreatedDate";
        this.orderByDesc = true;
    }

    validate() : ValidationResult {
        const result = new ValidationResult();
        if(this.pageIndex < 1) {
            result.set(false, "Chỉ số trang không hợp lệ");
        }

        if(this.pageSize < 1) {
            result.set(false, "Số mục mỗi trang không hợp lệ");
        }
        return result;
    }
}