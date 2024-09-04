import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
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
