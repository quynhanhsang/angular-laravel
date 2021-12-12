import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { COMPONENT_IDS } from 'src/app/components/common/const/component-constants';
import { ShareDto } from 'src/app/components/common/models/share-model';
import { RouterService } from 'src/app/router/router.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShareDataService } from 'src/app/shared/share-service/share.service';
import { LoadingScreenService } from 'src/app/utilities/splash/loading-screen.service';
import { MainBaseComponent } from '../../base-component/main-base/main-base.component';
import { DeleteUserRangeDto, FilterUserDto, UserDto } from '../administration.model';
import { AdministrationService } from '../administration.service';
import { AddUsersComponent } from './modal/add/add-users.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[RouterService, ShareDataService]
})
export class UsersComponent extends MainBaseComponent<UserDto, FilterUserDto, DeleteUserRangeDto> implements OnInit {
  search: string = null;
  constructor(public notifierService: NotifierService, public route: ActivatedRoute, public modalService: NgbModal, public loadingPageService: LoadingScreenService,
    public routerService: RouterService, public shareService: ShareDataService, public titleService: Title, private administrationService: AdministrationService) {
    super(notifierService, route, modalService, loadingPageService, routerService, shareService, titleService);
    debugger;
    shareService.changeEmitted$.subscribe( dto => {
      // kiểm tra đúng địa chỉ người nhận không
      if(!dto.id.includes(COMPONENT_IDS.USER_COMPONENT)) {
        return;
      }
    });

    //this.modalAlerts = new Array<ModalAlert>();
  }


  //userDto: UserProfileDto;

  ngOnInit(): void {
    this.componentId = COMPONENT_IDS.USER_COMPONENT;

    this.filterDto = new FilterUserDto();
    this.getAll();
  }

  getAll(){
    //this.userDto.name = this.search;
    this.loadingPageService.startLoading();
    this.administrationService.search(this.filterDto).subscribe(subscribe =>{
      //this.paginatedList = subscribe;
      this.loadingPageService.stopLoading();
    }, err=>{
      console.log(err);
      this.loadingPageService.stopLoading();
    });
  }

  onModalAdd(){
    // debugger;
    // const modal = this.modalService.open(AddUsersComponent, {size: 'xl'});
    // modal.componentInstance.userDto = this.userDto;
    // modal.result.then(
    //   ()=>{},
    //   ()=>{
    //     this.getAll();
    //   }
    // )
    // modal.dismiss(()=>{
    //   this.getAll();
    // });
  }
  onModalEdit(item: UserDto){
    const modal = this.modalService.open(AddUsersComponent, {size: 'xl'});
    modal.componentInstance.userDto = item;
    modal.result.then(
      ()=>{},
      ()=>{
        this.getAll();
      }
    )
  }
}
