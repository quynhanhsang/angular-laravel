import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AddUsersComponent } from './users/modal/add/add-users.component';
import { EditUsersComponent } from './users/modal/edit/edit-users.component';
import { UsersComponent } from './users/users.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: '', redirectTo: '/admin/users', pathMatch: 'full'},

                    { path: 'users', component: UsersComponent, canActivate:[AuthGuard], children:[
                      {
                        path: 'add',
                           component: AddUsersComponent,
                           canActivate: [AuthGuard],
                      },
                      {  path: 'edit/:id',
                         component: EditUsersComponent,
                         canActivate: [AuthGuard],
                      },
                    ]},

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdministrationRoutingModule {
}
