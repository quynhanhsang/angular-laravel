import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/shared/AppConsts';
import { PaginatedListDto } from 'src/app/shared/base-dto/base-paginated-list-dto';
import { AddRolesDto, DeleteRolesRangeDto, EditRolesDto, FilterRolesDto, RoleDto } from './roles.model';


@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {

  }

  // Forgot Pass
  getById(id:string){
    return this.http.get<EditRolesDto>(AppConst.remoteServiceBaseUrl + `/api/users/getbyid/${id}`);
  }

  filter(user?: FilterRolesDto){
    return this.http.post<PaginatedListDto<RoleDto>>(AppConst.remoteServiceBaseUrl +'/api/roles/filter', user);
  }

  edit(user: EditRolesDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/edit', user);
  }

  add(user: AddRolesDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/add', user);
  }
  delete(id: string){
    return this.http.get(AppConst.remoteServiceBaseUrl +'/api/users/delete/'+id);
  }

  deleteRange(ids: DeleteRolesRangeDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/users/deleterange', ids);
  }
}
