import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path:'', loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent) }
        ]
    },
    { path: '**', redirectTo: '/' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
