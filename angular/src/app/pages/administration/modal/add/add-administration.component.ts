import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDto } from '../../administration.model';
import { AdministrationService } from '../../administration.service';

@Component({
  selector: 'app-add-administration',
  templateUrl: './add-administration.component.html',
})
export class AddAdministrationComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private authenService: AuthenticationService,
    private profileService: AdministrationService) {

  }

  userDto: UserDto;

  ngOnInit(): void {
    this.userDto = new UserDto();
    let users = this.authenService.getUser();
  }

  onSubmit(){
    debugger;
    this.profileService.add(this.userDto).subscribe((subscribe)=>{
      // this.userDto = subscribe;
      console.log(subscribe, 'subscribe');
      this.activeModal.close();
    }, err=>{
     console.log(err, 'err');
    });
  }
  closeModal(){
    this.activeModal.close();
  }


}
