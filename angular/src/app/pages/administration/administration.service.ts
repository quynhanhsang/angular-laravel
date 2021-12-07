import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/shared/AppConsts';
import { UserDto, UserProfileDto } from './administration.model';


@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {

  }

  // Forgot Pass
  getById(id:number){
    return this.http.get(AppConst.remoteServiceBaseUrl + `/api/users/profile/${id}`);
  }

  search(user?: UserDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/search', user);
  }

  edit(user: UserDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/edit', user);
  }

  add(user: UserDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/add', user);
  }
}
