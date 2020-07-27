import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [
    UploadImageComponent
  ],
  exports: [
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2ImgMaxModule
  ],
  providers: []
})
export class ComponentsModule { }
