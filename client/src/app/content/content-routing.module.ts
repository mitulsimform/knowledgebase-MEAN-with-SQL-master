import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './View/content.component';
import { AddContentComponent } from './Add/content.component';


const routes: Routes = [
    {
        path: 'view/:id',
        component: ContentComponent,
    }, {
        path: 'add',
        component: AddContentComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }