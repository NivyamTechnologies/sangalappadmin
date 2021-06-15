import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcategoryComponent } from './addcategory.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : AddcategoryComponent,

}]

@NgModule({
  declarations: [AddcategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],

  exports : [RouterModule]
})
export class AddcategoryModule { }
