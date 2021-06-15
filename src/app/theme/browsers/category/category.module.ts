import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes : Routes = [{
  path : '',
  component : CategoryComponent,
  data : {
    title : 'Catogry Browser',
    icon: 'ti-layers',
    status : true
  }
}]
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class CategoryModule { }
