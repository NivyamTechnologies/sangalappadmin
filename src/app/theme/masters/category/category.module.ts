import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryComponent} from './category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { ImageToDataUrlModule } from "ngx-image2dataurl";
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [{
  path : '',
  component : CategoryComponent,

}]
@NgModule({
 
  imports: [
    CommonModule,  FormsModule,ReactiveFormsModule,ImageToDataUrlModule,  RouterModule.forChild(routes)
  ],
  declarations: [CategoryComponent],
  exports : [RouterModule]

})
export class CategoryModule { }
