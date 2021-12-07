import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FilterUserDto, UserDto } from './administration.model';
import { AdministrationService } from './administration.service';
import { AddAdministrationComponent } from './modal/add/add-administration.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  paginatedList: FilterUserDto;

  search: string;
  userDto: UserDto;
  pageList: Array<UserDto>;
  constructor(
    // public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authenService: AuthenticationService,
    private administrationService: AdministrationService) {

  }

  //userDto: UserProfileDto;

  ngOnInit(): void {
    this.userDto = new UserDto();
    this.getAll();
  }

  getAll(){
    this.userDto.name = this.search;
    this.administrationService.search(this.userDto).subscribe((subscribe: Array<UserDto>)=>{
      this.pageList = subscribe;
    }, err=>{
      console.log(err);
    });
  }

  onModalAdd(){
    debugger;
    const modal = this.modalService.open(AddAdministrationComponent, {size: 'xl'})
  }
}
