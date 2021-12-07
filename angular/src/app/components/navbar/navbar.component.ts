import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean = false;
  constructor(
    private auth:AuthenticationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.auth.status().subscribe((res) => {
      this.loggedIn = res;
       console.log('navbar:' + this.loggedIn);
    }, (err) => {
      console.log(err);
    })
  }

  editProfile(){
    const modalRef = this.modalService.open(ProfileComponent);
  }
}
