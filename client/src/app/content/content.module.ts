import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './View/content.component';
import { AddContentComponent } from './Add/content.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ContentRoutingModule
    ],
    declarations: [
        ContentComponent,
        AddContentComponent

    ]
})
export class ContentModule { }