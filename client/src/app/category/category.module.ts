import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './View/category.component';
import { AddCategoryComponent } from './Add/category.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoryRoutingModule
    ],
    declarations: [
        CategoryComponent,
        AddCategoryComponent

    ]
})
export class CategoryModule { }