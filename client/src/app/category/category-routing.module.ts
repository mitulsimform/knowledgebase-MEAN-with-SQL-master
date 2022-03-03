import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './View/category.component';
import { AddCategoryComponent } from './Add/category.component';


const routes: Routes = [
    {
        path: 'view',
        component: CategoryComponent,
    }, {
        path: 'add',
        component: AddCategoryComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }