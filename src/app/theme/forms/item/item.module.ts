import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemComponent} from './item.component';
import {ItemRoutingModule} from './item-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { ImageToDataUrlModule } from "ngx-image2dataurl";


@NgModule({
 
  imports: [
    CommonModule,ItemRoutingModule,  FormsModule,ReactiveFormsModule,ImageToDataUrlModule
  ],
  declarations: [ItemComponent],
  providers:[ApicallService,DatePipe]
})
export class ItemModule { }
