import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: 'overview', component: AppLayoutComponent, canActivate: [authGuard],
        children: [
            { path:'', loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent) }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/overview' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
