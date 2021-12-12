import { Component, OnInit } from "@angular/core";
import {Location} from '@angular/common';
import { LoadingScreenService } from "src/app/utilities/splash/loading-screen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseAddDto } from "src/app/shared/base-dto/base-add-dto";
import { ShareDataService } from "src/app/shared/share-service/share.service";
import { ShareDto } from "src/app/components/common/models/share-model";


@Component({
    selector: 'app-add-base',
    templateUrl: './add-base.component.html'
  })
  export class AddBaseComponent<TAddDto extends BaseAddDto> implements OnInit {
    baseComponentId: number = 0;
    baseRoute = "";
    showModal = false;
    addingItem: boolean;
    success: boolean = false;
    addDto: TAddDto;
    ngOnInit() {
      this.showModal = true;
    }

    alertOptions = {
      autoClose: false,
      keepAfterRouteChange: true,
      removeAnual: true
    };

    constructor( public router: Router, public loadingPageService: LoadingScreenService,
        public location: Location, public shareService: ShareDataService) {
      this.addingItem = false;
    }

    addItem() {
    }

    onClose() {
      this.showModal = false;
      this.router.navigateByUrl(this.baseRoute).then(r => {
        // có cần load lại page khi tắt modal page đi không. Nếu add thành công thì load lại, không thì thôi
        let dto = new ShareDto();
        dto.id = new Array<number>();
        dto.id.push(this.baseComponentId);
        // không load lại dữ liệu
        dto.data = this.success;
        this.shareService.emitChange(dto);
      });
    }
}
