import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBaseComponent } from 'src/app/pages/base-component/add-base/add-base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShareDataService } from 'src/app/shared/share-service/share.service';
import { LoadingScreenService } from 'src/app/utilities/splash/loading-screen.service';
import { AddUsersDto, EditUsersDto, UserDto } from '../../../administration.model';
import { AdministrationService } from '../../../administration.service';
import {Location} from '@angular/common';
import { ShareDto } from 'src/app/components/common/models/share-model';
import { COMPONENT_IDS } from 'src/app/components/common/const/component-constants';
import { NotifierService } from 'angular-notifier';
import { AppUtilityService } from 'src/app/shared/share-service/app-utility.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls:['./edit-users.component.css'] ,
  providers: [NgbModal]
})
export class EditUsersComponent implements OnInit {
  userDto: EditUsersDto;
  baseRoute: string;
  private notifierService: NotifierService;
  constructor(
    private authenService: AuthenticationService,
    private usersService: AdministrationService,
    private titleService: Title,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public loadingPageService: LoadingScreenService,
    public location: Location,
    public shareService: ShareDataService,
    public modalService: NgbModal,
    notifierService: NotifierService,
    public element: ElementRef) {
      this.titleService.setTitle('Thêm mới user');
      this.notifierService = notifierService;
  }

  @ViewChild('editModal') editModal : TemplateRef<any>;

  ngOnInit(): void {
    this.baseRoute = `/admin/users`;
    this.userDto = new EditUsersDto();
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      this.getByid(id);
    });
  }
  ngAfterViewInit(): void {

  }
  getByid(id: string){
    this.usersService.getById(id).subscribe((sub)=>{
      this.userDto = sub;
    }, (error)=>{
      this.notifierService.notify('error', 'Xảy ra lỗi');
      return;
    })
  }

  onSubmit(){
    if(AppUtilityService.IsNullValidateForm('formEditUser')){
      this.notifierService.notify('error', 'Bạn cần nhập đủ dữ liệu các trường có dấu * đỏ !!!');
      return;
    }
    if(this.userDto.writepassword != this.userDto.password){
      this.notifierService.notify('error', 'Mật khẩu không đúng');
      return;
    }

    this.usersService.edit(this.userDto).subscribe((subscribe: any)=>{

      this.notifierService.notify('success',subscribe.message);
      this.onClose();
    }, err=>{
     console.log(err, 'err');
    });
  }

  onClose() {
    this.router.navigateByUrl(this.baseRoute).then(r => {
      // có cần load lại page khi tắt modal page đi không. Nếu add thành công thì load lại, không thì thôi
      let dto = new ShareDto();
      dto.ids = new Array<number>();
      dto.ids.push(COMPONENT_IDS.USER_COMPONENT);
      // load lại dữ liệu
      dto.data = true;
      this.shareService.emitChange(dto);
    });
  }
}
