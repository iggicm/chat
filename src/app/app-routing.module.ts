import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DebateComponent} from './debate/debate.component';
import {AuthenticateGuard} from './authenticate.guard';
import {DebateItemComponent} from './debate-item/debate-item.component';
import {DebateListComponent} from './debate-list/debate-list.component';
import {LoginComponent} from './login/login.component';
import {ApplicationComponent} from './application/application.component';
import {AdminGuardGuard} from './admin-guard.guard';
import {AdminComponent} from './admin/admin.component';
import {ApplicationsComponent} from './applications/applications.component';
import {LogoutComponent} from './logout/logout.component';
import {TermsofconditionComponent} from './termsofcondition/termsofcondition.component';
import {UsersComponent} from './users/users.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';
import {FicheComponent} from './applications/fiche/fiche.component';
import {SuggestdebateComponent} from './debate/suggestdebate/suggestdebate.component';
import {SuggestdebatesComponent} from './debate/suggestdebates/suggestdebates.component';
import {DebateModeratorCandidatureComponent} from './debate/debate-moderator-candidature/debate-moderator-candidature.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {PasswordResetRequestComponent} from './password-reset-request/password-reset-request.component';
import {ProposeUserAsAdminComponent} from './propose-user-as-admin/propose-user-as-admin.component';
import {SignAdminPropositionComponent} from './sign-admin-proposition/sign-admin-proposition.component';
import {RevokeMemberComponent} from './revoke-member/revoke-member.component';
import {SignerevocationComponent} from './signerevocation/signerevocation.component';
import {CloseDebateComponent} from './close-debate/close-debate.component';
import {OpenDebateComponent} from './open-debate/open-debate.component';
import {ClosedDebatesComponent} from './closed-debates/closed-debates.component';
import {DebateDetailsComponent} from './debate-to-close/debate-details/debate-details.component';
import {ResumedDebatesComponent} from './closed-debates/resumed-debates/resumed-debates.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProjectsComponent} from './projects/projects.component';
import {ConfigComponent} from './users/config/config.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password/:email/:invitationid',
    component: ResetPasswordComponent,
  },
  {
    path: 'password-reset-request',
    component: PasswordResetRequestComponent,
  },
//dr foken
  {
    path: 'application',
    component: ApplicationComponent,
  },
  {
    path: 'termsofcondition',
    component: TermsofconditionComponent,
  },
  {
    path: 'user-details/:userid',
    component: UserDetailsComponent,
  },

  {
    path: 'debates',
    component: DebateComponent,
    canActivate: [AuthenticateGuard],
    children:[
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', component: UsersComponent},
      {path: 'list', component: DebateListComponent},
      {path: 'suggest-debate', component: SuggestdebateComponent},
      {path: 'closed-debate', component: ClosedDebatesComponent},
      {path: 'resumed-debates', component: ResumedDebatesComponent},
      {path:'debate-details/:debateid', component: DebateDetailsComponent},
      {path: 'projects', component: ProjectsComponent},
      {
        path:'debate/:debateid',
        component: DebateItemComponent
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'config',
        component: ConfigComponent,
      },
      {
        path: 'moderator-candidatures/:debateid', component: DebateModeratorCandidatureComponent
      },
      {
        path:'admin',
        component: AdminComponent,
        canActivate: [AdminGuardGuard],
        children:[
          {path: '', redirectTo: 'applications', pathMatch: 'full'},
          {
            path: 'applications', component: ApplicationsComponent,
            children:[

            ]
          },
          {
            path: 'suggesteddebates', component: SuggestdebatesComponent
          },
          {
            path: 'adminproposition', component: ProposeUserAsAdminComponent
          },
          {
            path: 'signeproposition', component: SignAdminPropositionComponent
          },

          {
            path: 'revoke-member', component: RevokeMemberComponent
          },
          {
            path: 'signerevocation', component: SignerevocationComponent
          },

          {
            path: 'close-debate', component: CloseDebateComponent
          },

          {
            path: 'open-debate', component: OpenDebateComponent
          },

          {
            path:'fiche/:applicationid',
            component:FicheComponent
          }

        ]
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

//

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



