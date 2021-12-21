import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserProfileDto } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private authenService: AuthenticationService,
    private profileService: ProfileService) {

  }

  userDto: UserProfileDto;

  ngOnInit(): void {
    this.userDto = new UserProfileDto();
    let users = this.authenService.getUser();

    this.getProfile(users.id);
  }

  getProfile(id: any){
    this.profileService.getById(id).subscribe((subscribe: UserProfileDto)=>{
       this.userDto = subscribe;
       console.log(this.userDto, 'users');
    }, err=>{
      console.log(err);
    });
  }

  onSubmit(){
    console.log(this.userDto, 'this.userDto');
    this.profileService.edit(this.userDto).subscribe((subscribe: UserProfileDto)=>{
      // this.userDto = subscribe;
      console.log(subscribe, 'subscribe');
      this.activeModal.close();
    }, err=>{
     console.log(err);
    });
  }
  closeModal(){
    this.activeModal.close();
  }


}
