import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/shared/AppConsts';
import { PaginatedListDto } from 'src/app/shared/base-dto/base-paginated-list-dto';
import { AddUsersDto, DeleteUserRangeDto, EditUsersDto, FilterUserDto, UserDto, UserProfileDto } from './administration.model';


@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {

  }

  // Forgot Pass
  getById(id:string){
    return this.http.get<EditUsersDto>(AppConst.remoteServiceBaseUrl + `/api/users/getbyid/${id}`);
  }

  filter(user?: FilterUserDto){
    return this.http.post<PaginatedListDto<UserDto>>(AppConst.remoteServiceBaseUrl +'/api/users/filter', user);
  }

  edit(user: EditUsersDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/edit', user);
  }

  add(user: AddUsersDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/add', user);
  }
  delete(id: string){
    return this.http.get(AppConst.remoteServiceBaseUrl +'/api/users/delete/'+id);
  }

  deleteRange(ids: DeleteUserRangeDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/deleterange', ids);
  }
}
