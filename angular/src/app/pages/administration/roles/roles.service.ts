import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConst } from 'src/app/shared/AppConsts';
import { PaginatedListDto } from 'src/app/shared/base-dto/base-paginated-list-dto';
import { AddRolesDto, DeleteRolesRangeDto, EditRolesDto, FilterRolesDto, ListPermission, PermissonDto, RoleDto } from './roles.model';


@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {

  }

  // Forgot Pass
  getById(id:string){
    return this.http.get<EditRolesDto>(AppConst.remoteServiceBaseUrl + `/api/roles/getbyid/${id}`);
  }

  filter(user?: FilterRolesDto){
    return this.http.post<PaginatedListDto<RoleDto>>(AppConst.remoteServiceBaseUrl +'/api/roles/filter', user);
  }

  edit(roles: EditRolesDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/roles/edit', roles);
  }

  add(roles: AddRolesDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/roles/add', roles);
  }
  delete(id: string){
    return this.http.get(AppConst.remoteServiceBaseUrl +'/api/roles/delete/'+id);
  }

  deleteRange(ids: DeleteRolesRangeDto){
    return this.http.post(AppConst.remoteServiceBaseUrl +'/api/roles/deleterange', ids);
  }

  getAllPermission(){
    return this.http.get<ListPermission<PermissonDto>>(AppConst.remoteServiceBaseUrl + `/api/roles/getAllPermission`);
  }
}
