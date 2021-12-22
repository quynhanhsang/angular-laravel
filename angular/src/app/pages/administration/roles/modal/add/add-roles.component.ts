import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddBaseComponent } from 'src/app/pages/base-component/add-base/add-base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShareDataService } from 'src/app/shared/share-service/share.service';
import { LoadingScreenService } from 'src/app/utilities/splash/loading-screen.service';

import {Location} from '@angular/common';
import { ShareDto } from 'src/app/components/common/models/share-model';
import { COMPONENT_IDS } from 'src/app/components/common/const/component-constants';
import { NotifierService } from 'angular-notifier';
import { AppUtilityService } from 'src/app/shared/share-service/app-utility.service';
import { AddRolesDto, ListPermission, PermissonDto } from '../../roles.model';
import { RolesService } from '../../roles.service';
@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls:['./add-roles.component.css'] ,
  providers: [NgbModal, NgbNavConfig]
})
export class AddRolesComponent implements OnInit {
  roleDto: AddRolesDto;
  baseRoute: string;
  private notifierService: NotifierService;
  constructor(
    private authenService: AuthenticationService,
    private rolesService: RolesService,
    private titleService: Title,
    public router: Router,
    public loadingPageService: LoadingScreenService,
    public location: Location,
    public shareService: ShareDataService,
    public modalService: NgbModal,
    notifier: NotifierService,
    public element: ElementRef) {
      this.titleService.setTitle('Thêm mới user');
      this.notifierService = notifier;

  }

  listPermission: ListPermission<PermissonDto>;
  permissonDto: PermissonDto;
  @ViewChild('editModal') editModal : TemplateRef<any>;

  ngOnInit(): void {
    this.baseRoute = `/admin/roles`;
    this.roleDto = new AddRolesDto();
    this.listPermission = new ListPermission<PermissonDto>();
    this.getAllPermission();
  }
  ngAfterViewInit(): void {

  }

  getAllPermission(){
    this.rolesService.getAllPermission(this.roleDto.guard_name).subscribe((res)=>{
      this.listPermission = res;
    }, ()=>{

    })
  }

  selectItem(item: PermissonDto){
     this.roleDto.namePermisson.push(item.name);
  }

  onSubmit(){
    if(AppUtilityService.IsNullValidateForm('formAddRole')){
      this.notifierService.notify('error', 'Bạn cần nhập đủ dữ liệu các trường có dấu * đỏ !!!');
      return;
    }

    if(this.roleDto.namePermisson.length<=0){
      this.notifierService.notify('error', 'Chưa có chức năng dành cho '+ this.roleDto.guard_name);
      return;
    }

    this.rolesService.add(this.roleDto).subscribe((subscribe: any)=>{
      console.log(subscribe, 'subscribe')
      if(subscribe){
        this.notifierService.notify('success',subscribe.message);
        this.onClose();
      }

    }, err=>{
    });
  }

  onClose() {
    this.router.navigateByUrl(this.baseRoute).then(r => {
      // có cần load lại page khi tắt modal page đi không. Nếu add thành công thì load lại, không thì thôi
      let dto = new ShareDto();
      dto.ids = new Array<number>();
      dto.ids.push(COMPONENT_IDS.ROLES_COMPONENT);
      // load lại dữ liệu
      dto.data = true;
      this.shareService.emitChange(dto);
    });
  }
}
