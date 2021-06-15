import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

 
  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }
  dataColumns = []
  dataRows = []

  getdata()
  {
    this.api.Post("/total/getBrowser",{Condition : "where 1=1"},["EntityName=category"]).subscribe(data=>{
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSchool(row)
  {
    this.route.navigate(['/forms/category',{'categoryId' : row['categoryId']}])
  }

  deleteSale(categoryId,rowIndex)
  {
    let qry = "Delete from category where categoryId = "+categoryId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("category delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from category"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"category")
    })
  }
}

