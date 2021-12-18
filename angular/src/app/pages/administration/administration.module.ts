import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { AppModule } from "src/app/app.module";
import { HideScrollbarYDirective } from "src/app/utilities/directive/hide-scrollbar-y.directive";
import { NgxModalDraggableDirective } from "src/app/utilities/directive/modal-draggable.directive";
import { ValidationCustomMessagesComponent } from "src/app/utilities/validation/validation-custom-messages.component";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { AddUsersComponent } from "./users/modal/add/add-users.component";
import { EditUsersComponent } from "./users/modal/edit/edit-users.component";
import { UsersComponent } from "./users/users.component";

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
    imports: [
      //AppModule,
      // BrowserModule,

      CommonModule,
      FormsModule,
      HttpClientModule,
      NgbModule,
      RouterModule,
      NotifierModule.withConfig(customNotifierOptions),
      LoadingBarModule,
      LoadingBarRouterModule,
      AdministrationRoutingModule,

    ],
    declarations: [
          //admintrator
      AddUsersComponent,
      EditUsersComponent,
      UsersComponent,
      ValidationCustomMessagesComponent,
      NgxModalDraggableDirective,
      HideScrollbarYDirective
    ],
    exports: [

    ],
    providers: [
        // {provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig},
        // {provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig},
        // {provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale},
        // { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ]
})
export class AdministrationModule {
}
