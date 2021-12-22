import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class AppUtilityService {
    constructor() {

    }

    static removeDau(str: string): string {
        if (this.isNullOrEmpty(str)) {
            return str;
        }
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
        str = str.replace(/ + /g, ' ');
        str = str.trim();
        return str;
    }
    static IsNullValidateForm = function (_htmlId: string) {
        if (this.isNullOrEmpty(_htmlId))
            return true;
        var _listElement = document.getElementById(_htmlId).querySelectorAll('.custom-error-validate') as NodeListOf<HTMLElement>;
        if (_listElement != null && _listElement.length > 0) {
            _listElement.forEach((_element) => {
                _element.style.display = 'inline';
            });
            return true;
        } else {
            return false;
        }
    }
    static getFullTextSearch(str) {
        if (this.isNullOrEmpty(str)) {
            return str;
        }
        str += '';
        str = this.removeDau(str);
        str = str.replace(/ /g, '');
        return str;
    }

    static isNullOrEmpty(input: any): boolean {
        let res = false;
        if (typeof (input) === 'undefined')
            res = true;
        if (input == null)
            res = true;
        input = String(input);
        if (input == '')
            res = true;
        return res;
    }

    static removeAccents(str) {
        let AccentsMap = [
            'aàảãáạăằẳẵắặâầẩẫấậ',
            'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
            'dđ', 'DĐ',
            'eèẻẽéẹêềểễếệ',
            'EÈẺẼÉẸÊỀỂỄẾỆ',
            'iìỉĩíị',
            'IÌỈĨÍỊ',
            'oòỏõóọôồổỗốộơờởỡớợ',
            'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
            'uùủũúụưừửữứự',
            'UÙỦŨÚỤƯỪỬỮỨỰ',
            'yỳỷỹýỵ',
            'YỲỶỸÝỴ'
        ];
        for (let i = 0; i < AccentsMap.length; i++) {
            let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            let char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static validateNumber = (number) => {
        var re = /^[0-9]{1,10}$/;
        return re.test(String(number).toLowerCase());
    }
    static validateMoment = (_dateTime) => {
        return _dateTime.isValid();
    }
    static isNotAnyItem(input): boolean {
        return (this.isNullOrEmpty(input) || input.length === 0);
    }

    static encrypted(input) {
        if (this.isNullOrEmpty(input)) {
            return input;
        }
        let key = CryptoJS.enc.Utf8.parse('0608198627072011');
        let iv = CryptoJS.enc.Utf8.parse('0608198627072011');
        let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encrypted.toString();
    }
    static formatCurrency(value) {
        try {
            var num = Number(value.toString().replace(/[^0-9.-]+/g, ""));
            //var numRound = num.toFixed(appSession.setting.SoChuSoThapPhan);
            var numRound = num.toFixed(0);
            var parts = numRound.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
        catch (err) {
            return "0";
        }
    }
}
