import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifierService } from 'angular-notifier';
import { COMPONENT_IDS } from 'src/app/components/common/const/component-constants';
import { ShareDto } from 'src/app/components/common/models/share-model';
import { RouterService } from 'src/app/router/router.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseDto } from 'src/app/shared/base-dto/base-dto';
import { PaginatedListDto } from 'src/app/shared/base-dto/base-paginated-list-dto';
import { ShareDataService } from 'src/app/shared/share-service/share.service';
import { LoadingScreenService } from 'src/app/utilities/splash/loading-screen.service';
import { MainBaseComponent } from '../../base-component/main-base/main-base.component';
import { AdministrationService } from '../administration.service';
import { DeleteRolesRangeDto, FilterRolesDto } from './roles.model';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers:[RouterService, ShareDataService]
})
export class RolesComponent extends MainBaseComponent<BaseDto, FilterRolesDto, DeleteRolesRangeDto> implements OnInit {

  constructor(
    public notifierService: NotifierService,
    public route: ActivatedRoute,
    public modalService: NgbModal,
    public loadingPageService: LoadingScreenService,
    public routerService: RouterService,
    public shareService: ShareDataService,
    public titleService: Title,
    private rolesService: RolesService,
    private authenticationService: AuthenticationService,
    private loadingBarService: LoadingBarService) {
    super(notifierService, route, modalService, loadingPageService, routerService, shareService, titleService);
    shareService.changeEmitted$.subscribe( dto => {
      // kiểm tra đúng địa chỉ người nhận không
      if(!dto.ids.includes(COMPONENT_IDS.ROLES_COMPONENT)) {
        return;
      }
    });

    //this.modalAlerts = new Array<ModalAlert>();
  }

  userToken: any = {};
  deleteRangeDto: DeleteRolesRangeDto;
  //userDto: UserProfileDto;

  ngOnInit(): void {
    this.componentId = COMPONENT_IDS.ROLES_COMPONENT;
    this.filterDto = new FilterRolesDto();
    this.deleteRangeDto = new DeleteRolesRangeDto();
    this.loadingDone = false;
    this.title = "Roles";
    this.userToken = this.authenticationService.getUser();
    this.registerRoute();
    //super.ngOnInit();
    this.loadPage();
  }


  getPaginatedList(){
    this.loadingBarService.start();

    this.rolesService.filter(this.filterDto).subscribe( (subscribe) =>{
     // debugger;

      this.paginatedList = subscribe;
      this.paginatedList.items = this.paginatedList.items.map((item)=>{ return {...item, using: ( item.id === this.userToken.id ? true : false)}; } );

      console.log(this.paginatedList, 'this.paginatedList');
      this.loadingDone = true;
      //this.loadingPageService.stopLoading();
      this.loadingBarService.stop();
    }, err=>{
      console.log(err);
      this.loadingBarService.stop();
      this.paginatedList = new PaginatedListDto();
    });
  }
  async registerRoute() {
    return new Promise((resolve, reject) => {
      this.route.queryParamMap.subscribe((params) => {

        this.filterDto.filter ||= params['params']['filter'];

        if(this.filterDto) {
          // this.registerComponentRoute(params);
          this.registerBaseRoute(params);
          if(!this.pageSizeOptions.includes(this.filterDto.pageSize)) {
            this.filterDto.pageSize = this.getClosestNumber(this.filterDto.pageSize, this.pageSizeOptions);
          }

          if(this.needLoadPage) {
            this.getPaginatedList();
          }
          this.needLoadPage = true;
        }
        resolve(true);
      }, error => {
        reject(error);
      });
    });
  }

  onDelete(id: string){
    this.rolesService.delete(id).subscribe( (subscribe: any) =>{
      this.notifierService.notify('success', subscribe.message);
      this.loadPage();
     }, err=>{
       console.log(err);
    });
  }


  onDeleteRange(){
    this.deleteRangeDto.ids = this.paginatedList.items.filter(item=>item.selected == true).map(item=>item.id);
    var validation = this.deleteRangeDto.validate();
    if(!validation.isSuccess) {
      this.notifierService.notify('error', 'Bạn chưa chọn phần tử để xóa');
      return;
    }

    this.rolesService.deleteRange(this.deleteRangeDto).subscribe((sub: any)=>{
      if(sub){
        this.notifierService.notify('success',sub.message);
        this.loadPage();
      }
    }, err=>{
      console.log(err, 'err');
    });
  }
}
