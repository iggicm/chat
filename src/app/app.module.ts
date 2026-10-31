import {GoogleMapsModule} from '@angular/google-maps';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient, withXhr} from '@angular/common/http';
import {LegacyWidgetsModule} from './shared/legacy-widgets.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import {PusherService} from './pusher.service';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DebateComponent } from './debate/debate.component';
import { DebateItemComponent } from './debate-item/debate-item.component';
import { DebateListComponent } from './debate-list/debate-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {CommonModule} from '@angular/common';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { AdminComponent } from './admin/admin.component';
import { ApplicationsComponent } from './applications/applications.component';
import { LogoutComponent } from './logout/logout.component';
import { ApplicationitemComponent } from './applicationitem/applicationitem.component';
import { TermsofconditionComponent } from './termsofcondition/termsofcondition.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { FicheComponent } from './applications/fiche/fiche.component';
import {LoginService} from './login.service';
import { SuggestdebateComponent } from './debate/suggestdebate/suggestdebate.component';
import { SuggestdebatesComponent } from './debate/suggestdebates/suggestdebates.component';
import { DebateModeratorCandidatureComponent } from './debate/debate-moderator-candidature/debate-moderator-candidature.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { ProposeUserAsAdminComponent } from './propose-user-as-admin/propose-user-as-admin.component';
import { SignAdminPropositionComponent } from './sign-admin-proposition/sign-admin-proposition.component';
import {FooterComponentComponent} from './footer-component/footer-component.component';
import {NgbModule, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { RevokeMemberComponent } from './revoke-member/revoke-member.component';
import { SignerevocationComponent } from './signerevocation/signerevocation.component';
import { CloseDebateComponent } from './close-debate/close-debate.component';
import { OpenDebateComponent } from './open-debate/open-debate.component';
import {MemberDialogComponent} from './revoke-member/member-dialog/member-dialog.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import {ShowFileDialogComponent} from './show-file-dialog/show-file-dialog.component';
import { DebateToCloseComponent } from './debate-to-close/debate-to-close.component';
import { ClosedDebatesComponent } from './closed-debates/closed-debates.component';
import { DebateDetailsDialogComponent } from './debate-to-close/debate-details-dialog/debate-details-dialog.component';
import { DebateDetailsComponent } from './debate-to-close/debate-details/debate-details.component';
import {DebateService} from './debate.service';
import { FileComponent } from './debate-to-close/debateDetails/file/file.component';
import {FileService} from './file.service';
import { ResumedDebatesComponent } from './closed-debates/resumed-debates/resumed-debates.component';
import { DebateResultComponent } from './closed-debates/debate-result/debate-result.component';
import {AccessService} from './access.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { DebateElementComponent } from './debate-list/debate-element/debate-element.component';
import { SubheaderComponent } from './navigation/subheader/subheader.component';
import { ConfigComponent } from './users/config/config.component';
import {ConfigService} from './config.service';
import {SafePipe} from './safe.pipe';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    HomeComponent,
    DebateComponent,
    DebateItemComponent,
    DebateListComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    ApplicationComponent,
    AdminComponent,
    ApplicationsComponent,
    LogoutComponent,
    ApplicationitemComponent,
    TermsofconditionComponent,
    UsersComponent,
    UserComponent,
    UserDetailsComponent,
    FicheComponent,
    SuggestdebateComponent,
    SuggestdebatesComponent,
    DebateModeratorCandidatureComponent,
    ResetPasswordComponent,
    PasswordResetRequestComponent,
    ProposeUserAsAdminComponent,
    SignAdminPropositionComponent,
    FooterComponentComponent,
    RevokeMemberComponent,
    SignerevocationComponent,
    CloseDebateComponent,
    OpenDebateComponent,
    MemberDialogComponent,
    UploadDialogComponent,
    ShowFileDialogComponent,
    SafePipe,
    DebateToCloseComponent,
    ClosedDebatesComponent,
    DebateDetailsDialogComponent,
    DebateDetailsComponent,
    FileComponent,
    ResumedDebatesComponent,
    DebateResultComponent,
    PageNotFoundComponent,
    ProjectsComponent,
    DebateElementComponent,
    SubheaderComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, GoogleMapsModule, MatSnackBarModule, LegacyWidgetsModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, MatSidenavModule, CommonModule,
    MatTabsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule,
    MatDatepickerModule,MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule, MatStepperModule, MatSelectModule,
    MatOptionModule, MatProgressSpinnerModule, MatAutocompleteModule,
     MatBadgeModule, MatProgressBarModule, NgbModule,
    MatDialogModule, MatChipsModule, MatTreeModule, MatGridListModule, ],
  providers: [provideZoneChangeDetection(), provideHttpClient(withXhr()), PusherService, LoginService, NgbPopoverConfig, FileService, DebateService, AccessService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
