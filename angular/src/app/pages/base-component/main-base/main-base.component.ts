import { Component, HostListener, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { RouterService } from "src/app/router/router.service";
import { BaseDeleteDto } from "src/app/shared/base-dto/base-delete-dto";
import { BaseDto } from "src/app/shared/base-dto/base-dto";
import { BaseFilterDto } from "src/app/shared/base-dto/base-filter-dto";
import { PageSize, PaginatedListDto } from "src/app/shared/base-dto/base-paginated-list-dto";
import { ShareDataService } from "src/app/shared/share-service/share.service";
import { LoadingScreenService } from "src/app/utilities/splash/loading-screen.service";

@Component({
  selector: 'app-main-base',
  templateUrl: './main-base.component.html',
  providers: [ RouterService, ShareDataService ]
})
export class MainBaseComponent<TDto extends BaseDto, TFilterDto extends BaseFilterDto, TDeleteRangeDto extends BaseDeleteDto> implements OnInit {
  componentId: number = 0;
  title = "";
  needLoadPage: boolean = false;
  // sort
  orderByDesc: boolean = true;
  sortType: string;
  pageSizeOptions = PageSize;
  // loading flag
  loadingDone: boolean;
  paginatedList: PaginatedListDto<TDto>;
  filterDto: TFilterDto;
  deletingItem: boolean;
  deleteItemId: string;
  deleteRangeDto: TDeleteRangeDto;

  alertOptions = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  selectedAll: boolean;
  showFunction: boolean = false;
  shiftSelect_KeyPressing: boolean;
  shiftSelect_CurrentIndex: number;

  constructor(public notifierService: NotifierService, public route: ActivatedRoute, public modalService: NgbModal, public loadingPageService: LoadingScreenService,
    public routerService: RouterService, public shareService: ShareDataService, public titleService: Title) {
    // đăng kí hộp thư tin nhắn
    shareService.changeEmitted$.subscribe( dto => {
      // kiểm tra có phải gửi đúng component không, dựa theo id
      if(!dto.ids.includes(this.componentId)) {
        return;
      }
      let reload = dto.data;
      if(reload) {
        this.needLoadPage = true;
        this.loadPage();
      } else {
        this.needLoadPage = false;
        this.routerService.navigate(this.filterDto);
      }
      this.titleService.setTitle(this.title);
    });
  }

  ngOnInit() {
    // loading flag
    this.loadingDone = false;
    this.paginatedList = new PaginatedListDto<TDto>();
    // delete
    this.deletingItem = false;

    // register function
    this.registerRoute().then(() => {
      this.loadPage();
    })
  }

  async registerRoute() : Promise<unknown> {
    return null;
  }

  registerComponentRoute(params: ParamMap) {

  }

  registerBaseRoute(params: ParamMap) {
    this.filterDto.pageIndex = (params['params']['pageIndex'] == undefined || params['params']['pageIndex'] > this.filterDto.pageIndex)? this.filterDto.pageIndex : +params['params']['pageIndex'];
    this.filterDto.pageSize = params['params']['pageSize'] == undefined ? this.filterDto.pageSize : +params['params']['pageSize'];

    this.filterDto.orderBy = params['params']['orderBy'] == undefined ? this.filterDto.orderBy : params['params']['orderBy'];
    this.filterDto.orderByDesc = params['params']['orderByDesc'] == undefined ? this.filterDto.orderByDesc : params['params']['orderByDesc'];

    this.filterDto.createdByUserIds = params['params']['createdByUserIds'] == undefined ? this.filterDto.createdByUserIds : params['params']['createdByUserIds'];
    this.filterDto.createdByUserNames = params['params']['createdByUserNames'] == undefined ? this.filterDto.createdByUserNames : params['params']['createdByUserNames'];
    this.filterDto.createdDateFrom = params['params']['createdDateFrom'] == undefined ? this.filterDto.createdDateFrom : params['params']['createdDateFrom'];
    this.filterDto.createdDateTo = params['params']['createdDateTo'] == undefined ? this.filterDto.createdDateTo : params['params']['createdDateTo'];

    this.filterDto.updatedByUserIds = params['params']['updatedByUserIds'] == undefined ? this.filterDto.updatedByUserIds : params['params']['updatedByUserIds'];
    this.filterDto.updatedByUserNames = params['params']['updatedByUserNames'] == undefined ? this.filterDto.updatedByUserNames : params['params']['updatedByUserNames'];
    this.filterDto.updatedDateFrom = params['params']['updatedDateFrom'] == undefined ? this.filterDto.updatedDateFrom : params['params']['updatedDateFrom'];
    this.filterDto.updatedDateTo = params['params']['updatedDateTo'] == undefined ? this.filterDto.updatedDateTo : params['params']['updatedDateTo'];
  }

  getPaginatedList() {
  }

  loadPage() {
    // change route

    this.routerService.navigate(this.filterDto, true).then(reLoadData => {
      // nếu route không đổi, load lại data nếu cần!
      if(reLoadData) {
        this.getPaginatedList();
        this.showFunction = false;
      }
    });
    this.titleService.setTitle(this.title);
  }

  deleteItem() {
  }

  deleteRangeItem() {
  }

  updateLoadFlag() {
    this.needLoadPage = false;
  }

  getClosestNumber(goal: number, arrlist: number []) {
    return arrlist.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  }


  openDeleteModal(modal, item: TDto) {
    if (item !== undefined && item !== null) {
      this.deleteItemId = item.id;
      // open modal
      this.modalService.open(modal, {size: 'xl', backdrop: 'static', keyboard: false, scrollable: true}).result.then(() => {
      }, () => {
      });
    } else {
      this.notifierService.notify('error', "Không xác định" );
      return;
    }
  }


  openDeleteRangeModal(modal) {
    if (this.countSelectedItem() > 0) {
      this.deleteRangeDto.ids = this.paginatedList.items.filter(item => item.selected === true).map(item => item.id);
      // open modal
      this.modalService.open(modal, {size: 'xl', backdrop: 'static', keyboard: false, scrollable: true}).result.then(() => {
      }, () => {
      });
    } else {
      this.notifierService.notify('error',"Chưa cái nào được chọn");
      return;
    }
  }

  // sort
  // sort date create
  sort(sortType: string) {
    this.sortType = sortType;
    this.filterDto.orderBy = sortType;
    this.filterDto.orderByDesc = this.orderByDesc;
    this.loadPage();
    this.orderByDesc = !this.orderByDesc;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event) {
    if (event.key === 'Shift') {
      this.shiftSelect_KeyPressing = true;
    }
  }
  @HostListener('window:keyup', ['$event'])
  onKeyup(event) {
    if (event.key === 'Shift') {
      this.shiftSelect_KeyPressing = false;
    }
  }
  selectItem(item: any) {
    if (this.shiftSelect_KeyPressing) {
      const prevIndex = this.shiftSelect_CurrentIndex;
      this.shiftSelect_CurrentIndex = this.paginatedList.items.indexOf(item);
      const fromIndex = prevIndex < this.shiftSelect_CurrentIndex ? prevIndex : this.shiftSelect_CurrentIndex;
      const toIndex = prevIndex > this.shiftSelect_CurrentIndex ? prevIndex : this.shiftSelect_CurrentIndex;
      const selectOrUnselect = this.paginatedList.items[prevIndex].selected;

      for (let i = fromIndex; i <= toIndex; i++) {
        this.paginatedList.items[i].selected = selectOrUnselect;
      }
    } else {
      this.shiftSelect_CurrentIndex = this.paginatedList.items.indexOf(item);

      let selectItem = this.paginatedList?.items;
      selectItem[this.shiftSelect_CurrentIndex].selected = !selectItem[this.shiftSelect_CurrentIndex].selected;

      if (selectItem?.filter(item=>item?.selected === true).length > 0) {
        this.showFunction = true;
      }
      else {
        this.showFunction = false;
        this.selectedAll = false;
      }
    }
  }

  selectAll() {

    if (this.selectedAll) {
        this.paginatedList.items.forEach(item => { item.selected = false; });
        this.showFunction = false;
    } else {
        this.paginatedList.items.forEach(item => { item.selected = true; });
        this.showFunction = true;
    }
  }

  countSelectedItem() {
      return this.paginatedList.items.filter(item => item.selected === true).length;
  }

  getItemFromStorage(id: string) {
    return this.paginatedList.items.filter(item => item.id == id)[0];
  }
}
