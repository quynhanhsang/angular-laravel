import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBaseComponent } from 'src/app/pages/base-component/add-base/add-base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShareDataService } from 'src/app/shared/share-service/share.service';
import { LoadingScreenService } from 'src/app/utilities/splash/loading-screen.service';
import { AddUsersDto, UserDto } from '../../../administration.model';
import { AdministrationService } from '../../../administration.service';
import {Location} from '@angular/common';
import { ShareDto } from 'src/app/components/common/models/share-model';
import { COMPONENT_IDS } from 'src/app/components/common/const/component-constants';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls:['./add-users.component.css'] ,
  //providers: [ShareDataService]
})
export class AddUsersComponent implements OnInit {
  userDto: UserDto;
  baseRoute: string;
  constructor(
    private authenService: AuthenticationService,
    private profileService: AdministrationService,
    private titleService: Title,
    public router: Router,
    public loadingPageService: LoadingScreenService,
    public location: Location,
    public shareService: ShareDataService,
    public modalService: NgbModal) {
      //super(router,loadingPageService, location, shareService);
      this.titleService.setTitle('Thêm mới user');
      //this.modalService.open( AddUsersComponent ,{size: '', backdrop: 'static', keyboard: false, scrollable: true});
  }


  ngOnInit(): void {
    //this.baseComponentId = COMPONENT_IDS.USER_COMPONENT;
    this.baseRoute = `/admin/users`;
    this.userDto = new UserDto();
   // let users = this.authenService.getUser();
  }

  onSubmit(){
    this.profileService.add(this.userDto).subscribe((subscribe)=>{
      // this.userDto = subscribe;
      console.log(subscribe, 'subscribe');

    }, err=>{
     console.log(err, 'err');
    });
  }

  onClose() {
    this.router.navigateByUrl(this.baseRoute).then(r => {
      // có cần load lại page khi tắt modal page đi không. Nếu add thành công thì load lại, không thì thôi
      let dto = new ShareDto();
      dto.id = new Array<number>();
      //dto.id.push(COMPONENT_IDS.AUDIO_COMPONENT);
      // load lại dữ liệu
      dto.data = true;
      this.shareService.emitChange(dto);
    });
  }
}
