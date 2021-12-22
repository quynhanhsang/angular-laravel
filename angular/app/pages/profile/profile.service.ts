import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/shared/AppConsts';
import { UserProfileDto } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {

  }

  // Forgot Pass
  getById(id:number){
    return this.http.get(AppConst.remoteServiceBaseUrl + `/api/users/profile/${id}`);
  }

  edit(user: UserProfileDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/edit', user);
  }
}
