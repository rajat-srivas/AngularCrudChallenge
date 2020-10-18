import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './../_services/user.service';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { CreationComponent } from './creation/creation.component';
import { UtilityServiceService } from './../_helper/utilityService.service';


@NgModule({
  declarations: [
    AppComponent,
      LandingComponent,
      UserGridComponent,
      SearchComponent,
      DeleteConfirmComponent,
      CreationComponent
   ],
  imports: [
BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents:[
    DeleteConfirmComponent,
    CreationComponent
  ],
  providers: [UserService, UtilityServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
