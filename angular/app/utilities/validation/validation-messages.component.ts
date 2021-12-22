import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppUtilityService } from 'src/app/shared/share-service/app-utility.service';

import { TYPE_VALIDATE } from './Enum';


@Component({
    selector: '<validation-messages>',
    template: `
    <span #mySpan class="form-control-feedback"
    [class]="isHidden ? '' : 'custom-error-validate'"
    style="display: none;"
    [hidden]="isHidden">
        {{messages}}
    </span>`
})

export class ValidationMessagesComponent implements OnChanges, AfterViewInit {

    @ViewChild('mySpan') _mySpan: ElementRef;

    @Input() sModel: any;
    @Input() equalsModel: any;
    @Input() sType: TYPE_VALIDATE;
    @Input() messagesInput: string;
    @Input() isNotValidateNullOrEmpty: boolean;
    @Input() nativeElement: any;
    messages: string= '';
    isHidden: boolean = false;
    isAfterViewInit: boolean = false;

    checkHidden(): void {
        this.messages = AppUtilityService.isNullOrEmpty(this.messagesInput)
            ? "Không được để trống trường này"
            : this.messages;

        this.isHidden = true;
        //if (AppUtilityService.isNullOrEmpty(this.sModel) && this.sModel !=0) {
        if (AppUtilityService.isNullOrEmpty(this.sModel)) {
            this.isHidden = this.isNotValidateNullOrEmpty;
        }
        else if (this.sType == TYPE_VALIDATE.Number && !AppUtilityService.validateNumber(this.sModel)) {
            this.messages = "Kí tự Không đúng định dạng";
            this.isHidden = false;
        }
        else if (this.sType == TYPE_VALIDATE.Email && !AppUtilityService.validateEmail(this.sModel)) {
            this.messages = "Email không đúng định dạng";
            this.isHidden = false;
        }
        else if (this.sType == TYPE_VALIDATE.Moment && !AppUtilityService.validateMoment(this.sModel)) {
            this.messages = "Nhập ngày/tháng/năm";
            this.isHidden = false;
        }

        else if (this.sType == TYPE_VALIDATE.MinValue && this.sModel != null && this.equalsModel != null && parseInt(this.sModel) < parseInt(this.equalsModel)) {
            this.messages = "Giá trị nhập < giá trị tối thiểu là: (" + this.equalsModel + ")";
            this.isHidden = false;
        }
        else if (this.sType == TYPE_VALIDATE.MaxValue && this.sModel != null && this.equalsModel != null && parseInt(this.sModel) > parseInt(this.equalsModel)) {
            this.messages = "Giá trị nhập > giá trị cho phép là: (" + this.equalsModel + ")";
            this.isHidden = false;
        }
        else if(this.sType == TYPE_VALIDATE.File && AppUtilityService.isNotAnyItem(this.sModel)){
          this.messages = "Bạn chưa chọn file";
          this.isHidden = false;
        }
        // else if(this.sType == TYPE_VALIDATE.PassWord && this.sModel != null && this.equalsModel != null && parseInt(this.sModel) < parseInt(this.equalsModel)){
        //     this.messages = "Giá trị nhập < giá trị tối thiểu là: (" + this.equalsModel + ")";
        //     this.isHidden = false;
        // }

        if (this.isAfterViewInit && this.nativeElement && this.nativeElement.style) {
            this.nativeElement.style.cssText = this.isHidden
                ? null
                : "color: #fd397a; border: 1px solid #fd397a;";
        }
    }

    ngOnChanges(_changes: SimpleChanges): void {
        if (this.isAfterViewInit) {
            this._mySpan.nativeElement.style.display = 'inline';
        }
        this.checkHidden();
    }

    ngAfterViewInit() {
        this.isAfterViewInit = true;
    }
}

